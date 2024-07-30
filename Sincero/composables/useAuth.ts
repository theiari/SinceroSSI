import { ref } from 'vue';
import { useCookie } from '#app';
import { decodeJWT } from 'did-jwt';

export default function useAuth() {
  const authToken = useCookie('__session').value;
  const isAuthenticated = ref(false);

  if (authToken) {
    try {
      const decodedToken = decodeJWT(authToken);
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if the token is expired
      if (decodedToken.payload.exp !== undefined && decodedToken.payload.exp > currentTime) {
        isAuthenticated.value = true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return { isAuthenticated };
 }
