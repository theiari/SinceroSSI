<template>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <template v-if="isAuthenticated">
        <a
          class="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <p>This is the dashboard, the session cookie is good: {{ isAuthenticated }}</p>
        </a>
      </template>
      <template v-else>
        <a
          class="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <p>You do not have access to the dashboard, response is : {{ jwt }}</p>
        </a>
      </template>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { decodeJWT } from 'did-jwt';

const isAuthenticated = ref(false);
const loading = ref(true);

async function fetchData() {
  try {
    const jwt = await $fetch('/api/login');
    console.log("response after the api call:", jwt.token);
    //const { jwt, userData } = response; // Extract data from response

    // Check if JWT exists and is valid (similar logic to useAuth)
    if (jwt) {
      try {
        const decodedToken = decodeJWT(jwt.token);
        console.log("decoded token:", decodedToken);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("decoded token payload exp :", decodedToken.payload.exp);
        console.log("current time:", currentTime);
        console.log("is current time greater than exp time:", decodedToken.payload.exp > currentTime);
        if (decodedToken.payload.exp !== undefined && decodedToken.payload.exp > currentTime) {
          isAuthenticated.value = true;
        }
        console.log("isAuthenticated:", isAuthenticated.value);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);

// Access isAuthenticated from useAuth or userData if available
</script>

  
  <style></style>
  