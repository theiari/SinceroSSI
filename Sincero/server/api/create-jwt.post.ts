import { createJWT, ES256KSigner } from 'did-jwt';

export default defineEventHandler(async (event) => {
  
    // Read the request body
    const body = await readBody(event);
    console.log("Received body:", body);

    // Ensure body is not undefined and contains the privateKey
    if (!body) {
      throw new Error('There is an error! Request body is missing');
      throw new Error('There is an error! Private key is missing');
    }

    const privateKey = body.privateKey;

    const signer = ES256KSigner(privateKey);
    console.log("Signer:", signer);

    const jwt = await createJWT(
      { aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', iat: undefined, name: 'uPort Developer' },
      { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
      { alg: 'ES256K' }
    );

    return { jwt, body: {privateKey: privateKey} };
   
});
