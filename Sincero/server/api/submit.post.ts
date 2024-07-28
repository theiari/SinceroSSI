import { defineEventHandler, readBody } from 'h3';
import Web3 from 'web3';
import { createJWT, ES256KSigner, hexToBytes, decodeJWT, verifyJWT} from 'did-jwt';
import {Resolver} from 'did-resolver';
import {getResolver} from 'ethr-did-resolver'
// Initialize web3
const web3 = new Web3();


export default defineEventHandler(async (event) => {
  // Read the request body
  const body = await readBody(event);
  const { signature, message, address } = body;
  var jwt = null;
  // Function to verify the signature
  const verifySignature = (originalMessage: string, publicKey: string, signature: string) => {
    try {
      const recoveredAddress = web3.eth.accounts.recover(originalMessage, signature);
      return recoveredAddress.toLowerCase() === publicKey.toLowerCase();
    } catch (error) {
      console.error('Error verifying signature:', error);
      return false;
    }
  };

  // Verify the signature
  const isValid = verifySignature(message, address, signature);

  if (isValid){
    const signer = ES256KSigner(hexToBytes(useRuntimeConfig().public.jwtSecret))
    jwt = await createJWT(
      { aud: 'did:ethr:'+body.address, iat: Math.floor(Date.now() / 1000), name: 'holder of the claim' },  //TODO maybe aud did type should be generalized to any blockchain
      { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer }, //TODO magic string issuer has to be replaced
      { alg: 'ES256K' }
    )

  }
  else
    throw new Error('Signature is invalid');


    let resolver = new Resolver({...getResolver({infuraProjectId: useRuntimeConfig().public.infuraSecret})});

    // use the JWT from step 1
    let verificationResponse = await verifyJWT(jwt, {
      resolver,
      audience: 'did:ethr:'+body.address,
    })

  // Return the verification result

  return { jwt: jwt,
    //  decoded: decodeJWT(jwt), verified:  verificationResponse

  } ;
});