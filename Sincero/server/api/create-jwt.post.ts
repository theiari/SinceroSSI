import { createJWT, ES256KSigner, hexToBytes } from 'did-jwt';

//import .env private key

export default defineEventHandler(async (event) => {
  
    // Read the request body
    const body = await readBody(event);
    console.log("JWT received body:", body.privateKey.toString().length);
    let i = process.env.NODE_ENV;
    // Ensure body is not undefined and contains the privateKey
    console.log("variable i:", i);
    const privateKey:string = useRuntimeConfig().public.secretKey as string;
    const signer = ES256KSigner(hexToBytes(privateKey));
    console.log("Signer:", signer);

    let jwt = await createJWT(
      { aud: 'did:ethr:'+body.address, iat: undefined, name: 'uPort Developer' },
      { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
      { alg: 'ES256K' }
    )

    return { jwt: jwt};
   
});



