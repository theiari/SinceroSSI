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
      <li>
       <NuxtLink to="/dashboard" class="text-gray-600 hover:text-blue-600 transition duration-300">Dashboard</NuxtLink>
      </li>
      <li>
       <NuxtLink to="/generate" class="text-gray-600 hover:text-blue-600 transition duration-300">Generate</NuxtLink>
      </li>
      <li>
       <NuxtLink @click="signMessage" class="text-gray-600 hover:text-blue-600 transition duration-300"
        >Sign DEBUG</NuxtLink
       >
      </li>
      <li>
       <NuxtLink @click="useMasca" class="text-gray-600 hover:text-blue-600 transition duration-300"
        >Connect to Masca DEBUG</NuxtLink
       >
      </li>
     </ul>
    </nav>
    <div class="flex items-center space-x-4">
     <div v-if="account"><b>Connected as: </b> {{ account }}</div>
     <div v-else>
      <NuxtLink @click.prevent="connectWallet" class="text-purple-600 hover:text-blue-600 transition duration-300">
       <Button>Login</Button></NuxtLink
      >
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

<style scoped>
.router-link-exact-active {
 color: green;
}
</style>

<script setup>
import { Button } from "@/components/ui/button";
import { enableMasca, isError } from "@blockchain-lab-um/masca-connector";

//  const { Web3 } = require("web3");
//  const web3 = new Web3("https://mainnet.infura.io/v3/cf8b5d7f9a914e03b5d3b9fb5751c006"); // Infura endpoint not so useful right now
//use web3.js to connect to the blockchain
// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
// isConnected();

//  onBeforeMount(async () => {
//   const connected = await isConnected();
//   if (connected) {
//    let temp = await ethereum.request({ method: "eth_requestAccounts" });
//     account.value = temp[0];
//   }
//  });

const account = ref("");
//async function to connect wallet
async function connectWallet() {
 console.log("Connecting wallet");
 try {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  console.log("Connected", accounts[0]);
  //todo contact the backend to make user sign a message and receive a jwt token
  signMessage();
  account.value = accounts[0];
 } catch (error) {
  console.error(error);
 }
}

//  async function isConnected() {
//   try {
//    const accounts = await ethereum
//     .request({ method: "eth_requestAccounts" })
//     // .then(handleAccountsChanged)
//     .catch((err) => {
//      // Some unexpected error.
//      // For backwards compatibility reasons, if no accounts are available, eth_accounts returns an
//      // empty array.
//      console.error(err);
//     });
//    if (accounts[0].length > 0) {
//     return true;
//    } else return false;
//   } catch (error) {
//    console.error(error);
//    return false;
//   }
//  }
async function useMasca() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  try {
    const enableResult = await enableMasca(accounts[0], {
    snapId: "npm:@blockchain-lab-um/masca", // Defaults to `npm:@blockchain-lab-um/masca`
    version: "1.2.2", // Defaults to the latest released version
    supportedMethods: ["did:polygonid", "did:pkh"], // Defaults to all available methods
    });
    console.log("enableResult", enableResult);
  } catch (error) {
    console.log(error);
  }
}
async function signMessage() {



 try {
  
 
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const message = "Please sign this message";
  const signature = await ethereum.request({ method: "personal_sign", params: [message, accounts[0]] });
  console.log("Signed", signature);

  // send the signature to the backend to verify the user and return a jwt token
  const { body } = await $fetch("/api/submit", {
   method: "post",
   body: { signature: signature, message: message, address: accounts[0] },
  }); //.then((res));
  //console.log(res);
 } catch (error) {
  console.log(error);
 }
}

//  async function signOut() {
//   try {
//    await ethereum.request({ method: "eth_requestAccounts" });
//   } catch (error) {
//    console.error(error);
//   }
//  }
</script>
