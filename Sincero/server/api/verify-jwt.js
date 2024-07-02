import { verifyJWT } from 'did-jwt'
import { Resolver } from 'did-resolver'

const resolver = new Resolver({
  // Configure your DID resolver here
  // Example for Universal Resolver:
  // 'web': async (did) => {
  //   return fetch(`https://uniresolver.io/1.0/identifiers/${did}`).then(res => res.json());
  // }
});

// verifyJWT('eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpc3MiOiJkaWQ6dXBvcn....', {
//   resolver,
//   audience: 'Your DID'
// }).then(({ payload, doc, did, signer, jwt }) => {
//   console.log(payload)
// })

export default async (req, res) => {
  const { token, audience } = req.body;

  if (!token || !audience) {
    return res.status(400).json({ error: 'Token and audience are required' });
  }

  try {
    const { payload, doc, did, signer, jwt } = await verifyJWT(token, {
      resolver,
      audience
    });
    return res.status(200).json({ payload, doc, did, signer, jwt });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}