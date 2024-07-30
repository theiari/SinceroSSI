// import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app';
// import jwtDecode, { decodeJWT } from 'did-jwt';
// export default defineNuxtRouteMiddleware( (to, from) => {
//   const nuxtApp = useNuxtApp();
//   const authToken = useCookie('__session').value
//   let isAuthenticated = false;

//   console.log("Auth token:", authToken);

//   if (import.meta.client){
//     console.log("import meta client", import.meta.client)
//     return 
//   }



//   if (authToken) {
//     try {
//       const decodedToken = decodeJWT(authToken);
//       const currentTime = Math.floor(Date.now() / 1000);

//       // Check if the token is expired
//       if (decodedToken.payload.exp !== undefined && decodedToken.payload.exp > currentTime) {
//         isAuthenticated = true;
//       }
//     } catch (error) {
//       console.error("Invalid token:", error);
//     }
//   }

//   console.log("User is authenticated:", isAuthenticated);
//   console.log("To fullPath:", to.fullPath);

//   // Redirect to '/' if trying to access '/dashboard/*' without authentication
//   if (to.fullPath.startsWith('/dashboard') && !isAuthenticated) {
//     return navigateTo('/');
//   }
// });


export default defineNuxtRouteMiddleware( (to, from) => {
  return 
});