
import { defineEventHandler, readBody, H3Event } from 'h3';
import { getCookie } from 'h3';


export default defineEventHandler(async (event) => {
    // let jwt = await didJWT.createJWT(
    //     { aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', iat: undefined, name: 'uPort Developer' },
    //     { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
    //     { alg: 'ES256K' }
    //   )
    const token = getCookie(event, '__session');
    if (!token) {
        return {
            message: 'No token found',
            code: 400,
        }
    }
    console.log("the token is: ", token);
    return { token }
    })