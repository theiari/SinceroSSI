import { defineEventHandler, readBody, H3Event } from 'h3';
import Web3 from 'web3';
import { createJWT, ES256KSigner, hexToBytes, decodeJWT, verifyJWT } from 'did-jwt';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { serialize } from 'cookie';  // Import the cookie package

// Initialize web3
const web3 = new Web3();
const resolver = new Resolver({ ...getResolver({ infuraProjectId: (useRuntimeConfig().public.infuraSecret) }) });
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
  const { signature, message, address,  } = body;
  body.message = message.concat(Math.random().toString(36).substring(7));
  // console.log('body:', body);
  let jwt: string | null = null;

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
  if (isValid) {
    const signer = ES256KSigner(hexToBytes(useRuntimeConfig().public.jwtSecret));
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = currentTime + (30 * 60); // Add 30 minutes in seconds
    jwt = await createJWT(
      { aud: 'did:ethr:' + body.address, exp: expirationTime, name: 'holder of the claim' },
      { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
      { alg: 'ES256K' }
    );

    // Set JWT as a cookie in the response header
    const cookie = serialize('token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    // Add the cookie to the response header
    event.node.res.setHeader('NewToken', cookie);
  } else {
    throw new Error('Signature is invalid');
  }
  

  // Use the JWT from step 1
  const verificationResponse = await verifyJWT(jwt, {
    resolver,
    audience: 'did:ethr:' + body.address,
  });



  // Return the verification result
  return {
    message: 'Signature is valid: ' + isValid,
    jwt: jwt,
    decoded: decodeJWT(jwt),
    verified: verificationResponse,
  };
});
