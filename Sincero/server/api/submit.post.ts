import { defineEventHandler, readBody } from 'h3';
import Web3 from 'web3';
import { createJWT, ES256KSigner, hexToBytes, verifyJWT} from 'did-jwt';
import { promises as fs } from 'fs';
import {Resolver} from 'did-resolver';
import {getResolver} from 'ethr-did-resolver'
// Initialize web3
const web3 = new Web3();
type AddressNonceMap = {
  [address: string]: number;
};
const noncesPath = "../Sincero/server/api/nonces/nonces.json"; 

async function invalidateNonce(target:string): Promise<number> {
  try {
    // Read the file
    const jsonData = await fs.readFile(noncesPath, 'utf8');

    // Parse the JSON string into an object
    const data: AddressNonceMap = JSON.parse(jsonData);

    if (target in data) {
      const nonce = data[target];
      
      // Remove the address-nonce pair
      delete data[target];

      // Write the updated data back to the file
      await fs.writeFile(noncesPath, JSON.stringify(data, null, 2), 'utf8');
      return nonce
    } else {
      throw new Error(`Address ${target} not found in the JSON data`);
    }
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read or parse the file: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export default defineEventHandler(async (event) => {
  // Read the request body
  const body = await readBody(event);
  const { signature, message, address } = body;
  
  var jwt = null;
  
  // Function to verify the signature
  const verifySignature = (originalMessage: string, publicKey: string, signature: string) => {
    try {
      console.log("the original message is: ", originalMessage);
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
    const seed = await invalidateNonce(address);//prevents replay attacks
 
  if (!seed || seed === 0) {
    throw new Error("Invalid nonce");
  }
    const signer = ES256KSigner(hexToBytes(useRuntimeConfig().public.jwtSecret))
    jwt = await createJWT(
      { aud: 'did:ethr:'+body.address, iat: Math.floor(Date.now() / 1000), name: 'holder of the claim', exp: Math.floor(Date.now() / 1000) + 1800},  //TODO maybe aud did type should be generalized to any blockchain
      { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer }, //TODO magic string issuer has to be replaced
      { alg: 'ES256K' }
    )

    // Set cookie with JWT token
    setCookie(event, '__session', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 // 1 hour
    });


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