// server/api/verify-jwt.post.js
import { decodeJWT } from 'did-jwt';
import { verifyCredential } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';

export default defineEventHandler(async (event) => {
  // const body = await useBody(event);
  const token = getCookie(event, '__session');
  console.log("the token:", token);
  if (!token) {
    console.log("No token provided!!!");
    throw createError({ statusCode: 401, statusMessage: 'No token provided' });
  }
  // const { jwt } = body;
  console.log("the token:", token);
  const resolver = new Resolver(getResolver({infuraProjectId: useRuntimeConfig().public.infuraSecret}));

  try {
    // const decoded = await decodeJWT(token);
    
    return { token: token };
  }
   catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'No token provided' });
  }
});
