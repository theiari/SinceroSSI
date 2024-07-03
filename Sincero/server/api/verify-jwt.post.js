// server/api/verify-jwt.post.js
import { verifyCredential } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';

export default defineEventHandler(async (event) => {
  const body = await useBody(event);

  const { jwt } = body;

  const resolver = new Resolver(getResolver());

  try {
    const verified = await verifyCredential(jwt, {
      resolver,
    });
    return { verified };
  } catch (error) {
    return { error: error.message };
  }
});
