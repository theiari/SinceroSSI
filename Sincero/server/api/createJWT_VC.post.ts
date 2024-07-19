import { defineEventHandler, readBody, H3Event } from 'h3';
import Web3 from 'web3';
import { createJWT, ES256KSigner, hexToBytes, decodeJWT, verifyJWT } from 'did-jwt';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { serialize } from 'cookie';  // Import the cookie package
import { createVerifiableCredentialJwt, type Issuer, type JwtCredentialPayload } from 'did-jwt-vc'
import { EthrDID } from 'ethr-did'
import { validate } from 'vee-validate';
// Initialize web3
const web3 = new Web3();
const resolver = new Resolver({ ...getResolver({ infuraProjectId: (useRuntimeConfig().public.infuraSecret) }) });

//TODO all these magic strings should be in the .env file, right now are syntehtic stuff
const issuer = new EthrDID({
  identifier: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
  privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75'
}) as Issuer

// const vcPayload: JwtCredentialPayload = {
//   sub: 'did:ethr:0x435df3eda57154cf8cf7926079881f2912f54db4',
//   nbf: 1562950282,
//   vc: {
//     '@context': ['https://www.w3.org/2018/credentials/v1'],
//     type: ['VerifiableCredential'],
//     credentialSubject: {
//       degree: {
//         type: 'BachelorDegree',
//         name: 'Baccalauréat en musiques numériques'
//       }
//     }
//   }
// }

// const vcJwt = await createVerifiableCredentialJwt(vcPayload, 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74')
// console.log(vcJwt)

//function to check data validity
//type should either be 'exam' 'degree' or 'multiple'
const validateData = (title:string, grade:number, maxGrade:number, DID:string, certification:string) => {
  const validTypes = ["exam", "degree", "multiple"];

  if (typeof title !== 'string' || !title.trim()) {
    console.log("title is not valid");
    return false;
  }
  if (typeof grade !== 'number' || isNaN(grade)) {
    return false;
  }
  if (typeof maxGrade !== 'number' || isNaN(maxGrade)) {
    console.log("maxGrade is not valid");
    return false;
  }
  if (typeof DID !== 'string' || !DID.trim()) {
    console.log("DID is not valid");
    return false;
  }
  if (!validTypes.includes(certification)) {
    console.log("certification type is not valid");
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
  const { title, grade, maxGrade, DID, certification  } = body;

  //todo data validation
  if (!validateData(title, grade, maxGrade, DID, certification)){
    return {
      message: 'Data validation failed',
      code: 400,
    
    }
  }
  // Create the VC
  const vc: JwtCredentialPayload = {
    sub: 'did:ethr:0x435df3eda57154cf8cf7926079881f2912f54db4', //TODO most likely to change this
    nbf: 1562950282,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        degree: {
          type: certification,
          title: title,
          grade: grade,
          maxGrade: maxGrade,
          extra: DID,
        }
      }
    }
  }
  const vcJwt = await createVerifiableCredentialJwt(vc, issuer)
  return {
    message: 'ok',
    jwt: vcJwt,
    code: 200,
  }
  
});
