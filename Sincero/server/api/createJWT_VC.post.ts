import { defineEventHandler, readBody, H3Event } from 'h3';

import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { serialize } from 'cookie';  // Import the cookie package
import { createVerifiableCredentialJwt, type Issuer, type JwtCredentialPayload } from 'did-jwt-vc'
import { EthrDID } from 'ethr-did'
import { agent } from '../../services/veramo-agent/src/veramo/setup.js'
import type { CredentialPayload } from '@veramo/core-types';


// async function createVC() {
//   let identifier;
//   try {
//     // Attempt to get the identifier by alias
//     identifier = await agent.didManagerGetByAlias({ alias: 'default' });
//   } catch (e) {
//     // Log the error and create a new identifier if the alias is not found
//     console.log(e);
//     console.log("Creating identifier");
//     identifier = await agent.didManagerCreate({ alias: 'default' });
//   } finally {
//     // Ensure the identifier is fetched or created
//     identifier = await agent.didManagerGetByAlias({ alias: 'default' });
//   }

//   // Create a verifiable credential
//   const verifiableCredential = await agent.createVerifiableCredential({
//     credential: {
//       issuer: { id: identifier.did },
//       credentialSubject: {
//         id: 'did:web:example.com',
//         you: 'Rock',
//       },
//     },
//     proofFormat: 'jwt',
//   });

//   // Log the newly created credential
//   console.log('New credential created');
//   console.log(JSON.stringify(verifiableCredential, null, 2));

//   return verifiableCredential;
// }


//createVC().catch(console.log)
// Initialize web3


//TODO all these magic strings should be in the .env file, right now are syntehtic stuff
// const issuer = new EthrDID({
//   identifier: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
//   privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75'
// }) as Issuer


//function to check data validity
//type should either be 'exam' 'degree' or 'multiple'
const validateData = (title:string, grade:number, maxGrade:number, DID:string, certification:string) => {
  const validTypes = ["exam", "degree", "multiple"];

  if (typeof title !== 'string'|| title.length < 3 || title.length > 100) {
    console.log("title is not valid: ", title);
    return false;
  }
  if (typeof grade !== 'number' || isNaN(grade) || grade < 0) {
    return false;
  }
  if (typeof maxGrade !== 'number' || isNaN(maxGrade) || maxGrade < grade) {
    console.log("maxGrade is not valid");
    return false;
  }
  // if (typeof DID !== 'string' || !DID.trim()) {
  //   console.log("DID is not valid");
  //   return false;
  // }
  if (!validTypes.includes(certification) || typeof certification !== 'string') {
    console.log("certification type is not valid");
    console.log(certification);
    return false;
  }
  
  return true; // or you can return an object with valid data if needed
}

export default defineEventHandler(async (event: H3Event) => {
  // //TODO check if the token is already present, if it is, check if it is valid and return the response
  // if( getCookie(event, 'token')){
  //   console.log("cookie already present");
  //   let cookie = getCookie(event, 'token');
  //   const body = await readBody(event);
  //   const valid = await verifyJWT(cookie || '', {
  //     resolver,
  //     audience: 'did:ethr:' + body.address,
  //   });
  //   console.log("the JWT is valid: ", valid);
  // }

  // Read the request body
  const body = await readBody(event);
  const { credentialSubject, signer, issuanceDate  } = body;

  //todo data validation
  if (!validateData(credentialSubject.title, credentialSubject.grade, credentialSubject.maxGrade, signer, credentialSubject.certification)){
    return {
      message: 'Data validation failed',
      code: 400,
    
    }
  }
  // Create the VC
  const token = getCookie(event, '__session');
  console.log("the token is this one: ", token);

  
  let identifier;
  try {
    // Attempt to get the identifier by alias
    identifier = await agent.didManagerGetByAlias({ alias: 'default' });
  } catch (e) {
    // Log the error and create a new identifier if the alias is not found
    console.log(e);
    console.log("Creating identifier");
    identifier = await agent.didManagerCreate({ alias: 'default' });
  } finally {
    // Ensure the identifier is fetched or created
    identifier = await agent.didManagerGetByAlias({ alias: 'default' });
  }
  
  const vc1: CredentialPayload = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    issuer: { id: identifier.did },
    issuanceDate: issuanceDate,
    credentialSubject: {
      id: signer || 'default-subject-id',
      type: credentialSubject.type || 'default-type',
      certification: credentialSubject.certification,
      title: credentialSubject.title,
      grade: credentialSubject.grade,
      maxGrade: credentialSubject.maxGrade,
    },
    nbf: 1562950282, // Optional non-blocking time
  
    // Directly add credential schema as an extension at the top level
    credentialSchema: {
      type: 'JsonSchemaValidator2020',
      version: '1.0.0',
      id: 'ipfs://abc123',
      // schema: {
      //   type: 'object',
      //   properties: {
      //     certification: {
      //       type: 'string',
      //       enum: ['exam', 'degree', 'multiple'],
      //     },
      //     title: {
      //       type: 'string',
      //       minLength: 3,
      //       maxLength: 100,
      //     },
      //     grade: {
      //       type: 'number',
      //       minimum: 0,
      //     },
      //     maxGrade: {
      //       type: 'number',
      //       minimum: credentialSubject.grade,
      //     },
      //     extra: {
      //       type: 'string',
      //       format: 'uri',
      //     },
      //   },
      //   required: ['certification', 'title', 'grade', 'maxGrade'],
      // },
    },
  
    // Add proof directly at the top level, if necessary
    proof: {
      type: 'JwtProof2020',
      jwt: token || 'default-jwt',
    },
  };
  console.log("the vc is: ", vc1);
  const vcJwt = await agent.createVerifiableCredential({
     credential: vc1,
    proofFormat: 'jwt',
  })
   
  
  // const veramoVC = await createVC();
  // const veramoVC = await agent.createVerifiableCredential({
  //   credential: {
  //     issuer:  body.issuer,
  //     credentialSubject: body.credentialSubject
  //     },
  //   proofFormat: 'jwt',
  // });
  return {
    message: 'ok',
    jwt: vcJwt,
    code: 200,
    // veramoVC: veramoVC,
    
  }
  
});
