// server/api/verify-jwt.post.js
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
    const verified = await verifyDidJwt(token, {
      resolver,
       audience: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
    });
    return { verified };
  } catch (error) {
    return { error: error.message, code: 401 };
  }
});
