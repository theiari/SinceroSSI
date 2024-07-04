<template>
 <div class="min-h-screen flex flex-col">
  <header class="bg-white shadow-lg">
   <div class="container mx-auto px-6 py-2 flex justify-between items-center">
    <NuxtLink to="/" class="flex items-center">
     <!-- Adjust the image size and move it a bit to the left -->
     <img src="../logo.svg" class="w-24 mr-4" />
    </NuxtLink>
    <nav class="flex-grow">
  <ul class="flex w-full space-x-5 text-lg font-medium items-center">
    <!-- Navigation links -->
    <li><NuxtLink to="/about" class="text-gray-600 hover:text-blue-600 transition duration-300">About</NuxtLink></li>
    <li><NuxtLink to="/dashboard" class="text-gray-600 hover:text-blue-600 transition duration-300">Dashboard</NuxtLink></li>
    <li><NuxtLink to="/generate" class="text-gray-600 hover:text-blue-600 transition duration-300">Generate</NuxtLink></li>
    <!-- Spacer to push the login/sign out button to the right -->
    <li class="ml-auto">
      <div class="flex items-center space-x-4">
        <li v-if="loggedIn">
          <NuxtLink to="/api/auth/signout" external class="text-red-600 hover:text-blue-600 transition duration-300">Sign out</NuxtLink>
        </li>
        <li v-else>
          <NuxtLink @click="loginAndSignMessage" external class="text-purple-600 hover:text-blue-600 transition duration-300">Login</NuxtLink>
        </li>
        <li>
          <NuxtLink @click="connectWallet" external class="text-green-600 hover:text-blue-600 transition duration-300">Sign message</NuxtLink>
        </li>
      </div>
    </li>
  </ul>
</nav>
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

<style scoped>
.router-link-exact-active {
 color: green;
}
</style>

<script setup>
import { useSession } from "next-auth/react"


//use web3.js to connect to the blockchain 
// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

//async function to connect wallet
async function connectWallet() {
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log('Connected', accounts[0]);
  } catch (error) {
    console.error(error);
  }
}

async function signMessage() {
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const message = 'Please sign this message';
    const signature = await ethereum.request({ method: 'personal_sign', params: [message, accounts[0]] });
    console.log('Signed', signature);
  } catch (error) {
    console.log(error);
  }
}

</script>
