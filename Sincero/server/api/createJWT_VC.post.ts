import { defineEventHandler, readBody, H3Event } from 'h3';
import Web3 from 'web3';
import { createJWT, ES256KSigner, hexToBytes, decodeJWT, verifyJWT } from 'did-jwt';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { serialize } from 'cookie';  // Import the cookie package
import { createVerifiableCredentialJwt, type Issuer, type JwtCredentialPayload } from 'did-jwt-vc'
import { EthrDID } from 'ethr-did'
// Initialize web3
const web3 = new Web3();
const resolver = new Resolver({ ...getResolver({ infuraProjectId: (useRuntimeConfig().public.infuraSecret) }) });

//TODO all these magic strings should be in the .env file, right now are syntehtic stuff
const issuer = new EthrDID({
  identifier: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
  privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75'
}) as Issuer

const vcPayload: JwtCredentialPayload = {
  sub: 'did:ethr:0x435df3eda57154cf8cf7926079881f2912f54db4',
  nbf: 1562950282,
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      degree: {
        type: 'BachelorDegree',
        name: 'Baccalauréat en musiques numériques'
      }
    }
  }
}

// const vcJwt = await createVerifiableCredentialJwt(vcPayload, 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74')
// console.log(vcJwt)


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
  const { title, grade, maxGrade, DID  } = body;
  console.log("title: ", title);
  console.log("grade: ", grade);
  console.log("maxGrade: ", maxGrade);
  console.log("DID: ", DID);

  //todo data validation

  // Create the VC
  const vc: JwtCredentialPayload = {
    sub: 'did:ethr:0x435df3eda57154cf8cf7926079881f2912f54db4', //TODO most likely to change this
    nbf: 1562950282,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        degree: {
          type: 'BachelorDegree',
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
  // body.message = message.concat(Math.random().toString(36).substring(7));
  // // console.log('body:', body);
  // let jwt: string | null = null;

  // // Function to verify the signature
  // const verifySignature = (originalMessage: string, publicKey: string, signature: string) => {
  //   try {
  //     const recoveredAddress = web3.eth.accounts.recover(originalMessage, signature);
  //     return recoveredAddress.toLowerCase() === publicKey.toLowerCase();
  //   } catch (error) {
  //     console.error('Error verifying signature:', error);
  //     return false;
  //   }
  // };

  // // Verify the signature
  // const isValid = verifySignature(message, address, signature);
  // if (isValid) {
  //   const signer = ES256KSigner(hexToBytes(useRuntimeConfig().public.jwtSecret));
  //   const currentTime = Math.floor(Date.now() / 1000);
  //   const expirationTime = currentTime + (30 * 60); // Add 30 minutes in seconds
  //   jwt = await createJWT(
  //     { aud: 'did:ethr:' + body.address, exp: expirationTime, name: 'holder of the claim' },
  //     { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
  //     { alg: 'ES256K' }
  //   );

  //   // Set JWT as a cookie in the response header
  //   const cookie = serialize('token', jwt, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'strict',
  //     path: '/',
  //   });

  //   // Add the cookie to the response header
  //   event.node.res.setHeader('token', cookie);
  // } else {
  //   throw new Error('Signature is invalid');
  // }
  

  // // Use the JWT from step 1
  // const verificationResponse = await verifyJWT(jwt, {
  //   resolver,
  //   audience: 'did:ethr:' + body.address,
  // });



  // // Return the verification result
  // return {
  //   message: 'Signature is valid: ' + isValid,
  //   jwt: jwt,
  //   decoded: decodeJWT(jwt),
  //   verified: verificationResponse,
  // };
});
