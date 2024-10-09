import { defineEventHandler, readBody, H3Event } from 'h3';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { createVerifiableCredentialJwt, type Issuer, type JwtCredentialPayload } from 'did-jwt-vc'
import { EthrDID } from 'ethr-did'
// Initialize web3
// const web3 = new Web3();
const resolver = new Resolver({ ...getResolver({ infuraProjectId: (useRuntimeConfig().public.infuraSecret) }) });

//TODO all these magic strings should be in the .env file, right now are syntehtic stuff
const issuer = new EthrDID({
  identifier: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
  privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75'
}) as Issuer

//const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer)
//console.log(vcJwt)


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
 
  return {
    status: 200,
    body: {
      message: 'Hello from the server!',
      body
    }
  };
});
