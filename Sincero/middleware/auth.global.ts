import jwtDecode, { decodeJWT } from 'did-jwt';
// import context from "@nuxt/types";
export default defineNuxtRouteMiddleware((to, from) => {
  // Get the cookies using cookie-universal-nuxt
  // const cookies = context.app.$cookies;

  // Retrieve the token from cookies
  // const authToken = cookies.get('token');
  const authToken = useCookie('token').value;

  console.log("Auth token:", authToken);
  let isAuthenticated = false;

  
  if (authToken) {
    try {
      const decodedToken = decodeJWT(authToken);
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token is expired

      if (decodedToken.payload.exp != undefined && decodedToken.payload.exp > currentTime) {
        isAuthenticated = true; //TODO 
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  console.log("User is authenticated:", isAuthenticated);
  console.log("To fullpath:", to.fullPath);

  // Redirect to '/' if trying to access '/dashboard' without authentication TODO IMPLEMENT AUTHENTICATION CHECK
  // if (to.fullPath === '/dashboard' && !isAuthenticated) {
  //   return navigateTo('/');
  // }
});
