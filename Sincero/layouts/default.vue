<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-lg">
      <div class="container mx-auto px-6 py-2 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center">
          <!-- Adjust the image size and move it a bit to the left -->
          <img src="../logo.svg" class="w-24 mr-4" />
        </NuxtLink>
        <nav class="flex-grow">
          <ul class="flex space-x-5 text-lg font-medium items-center">
            <!-- Navigation links -->
            <li><NuxtLink to="/about" class="text-gray-600 hover:text-blue-600 transition duration-300">About</NuxtLink></li>
            <li><NuxtLink to="/dashboard" class="text-gray-600 hover:text-blue-600 transition duration-300">Dashboard</NuxtLink></li>
            <li><NuxtLink to="/generate" class="text-gray-600 hover:text-blue-600 transition duration-300">Generate</NuxtLink></li>
            <li>
              <NuxtLink @click="signMessage" class="text-gray-600 hover:text-blue-600 transition duration-300">Sign DEBUG</NuxtLink>
            </li>
            <li>
              <NuxtLink @click="useMasca" class="text-gray-600 hover:text-blue-600 transition duration-300">Connect to Masca DEBUG</NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="flex items-center space-x-4">
          <div v-if="account"><b>Connected as: </b> {{ account }}</div>
          <div v-else>
            <Button @click.prevent="connectWallet" class="text-white hover:text-blue-600 transition duration-300 button">
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow bg-gray-50">
      <slot />
    </main>

    <footer class="bg-gray-800 text-gray-400">
      <div class="container mx-auto px-1 py-8 text-center">
        <p>&copy; Antonino Iaria</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';
import { Button } from '@/components/ui/button';
import { enableMasca } from '@blockchain-lab-um/masca-connector';

const account = ref('');
const isAuthenticated = ref(false);

// Function to connect wallet
async function connectWallet() {
  console.log('Connecting wallet');
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log('Connected', accounts[0]);
    await signMessage(accounts[0]);
    account.value = accounts[0];
    isAuthenticated.value = true;
  } catch (error) {
    console.error(error);
  }
}

// Function to use Masca
async function useMasca() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  try {
    const enableResult = await enableMasca(accounts[0], {
      snapId: 'npm:@blockchain-lab-um/masca', // Defaults to `npm:@blockchain-lab-um/masca`
      version: '1.2.2', // Defaults to the latest released version
      supportedMethods: ['did:polygonid', 'did:pkh'], // Defaults to all available methods
    });
    console.log('enableResult', enableResult);
  } catch (error) {
    console.log(error);
  }
}

// Function to sign a message
async function signMessage(address) {
  try {
    const message = 'Please sign this message';
    const signature = await ethereum.request({ method: 'personal_sign', params: [message, address] });
    console.log('Signed', signature);

    // Send the signature to the backend to verify the user and return a JWT token
    const response = await $fetch('/api/submit', {
      method: 'POST',
      body: { signature: signature, message: message, address: address },
    });
    console.log(response);

    if (response.token) {
      // Save token to localStorage
      localStorage.setItem('authToken', response.token);
      isAuthenticated.value = true;
    }
  } catch (error) {
    console.log(error);
  }
}

// Check authentication status on mounted
onMounted(async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const { data } = await useFetch('/api/login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.value.token) {
        isAuthenticated.value = true;
        account.value = data.value.address; // Assuming your backend sends the address
      }
    } catch (error) {
      console.error('Not authenticated:', error);
      // Remove invalid token
      localStorage.removeItem('authToken');
    }
  }
});
</script>

<style scoped>
.router-link-exact-active {
  color: green;
}
</style>
