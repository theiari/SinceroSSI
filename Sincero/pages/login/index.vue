<template>
 <div class="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col">
  <main class="flex-grow flex items-center justify-center">
   <section class="bg-white shadow-lg rounded-lg max-w-md w-full p-8 md:p-12 lg:p-16">
    <div class="flex flex-col items-center">
     <h1 class="text-4xl font-extrabold text-gray-800 mb-6">Welcome</h1>
     <p class="text-lg text-gray-600 mb-8 text-center">Connect your MetaMask wallet to access your account.</p>
     <button
      @click="connectMetaMask"
      class="bg-indigo-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
     >
      Connect with MetaMask
     </button>
    </div>
   </section>
  </main>
  <footer class="bg-white py-4 text-center text-gray-500">
   <p>&copy; 2024 Your Company. All rights reserved.</p>
  </footer>
 </div>
</template>

<script setup>
import Web3 from "web3";

const connectMetaMask = async () => {
 if (window.ethereum) {
  try {
   const web3 = new Web3(window.ethereum);
   const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
   const userAccount = accounts[0];
   console.log("MetaMask account:", userAccount);
   // Redirect to /dashboard

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

   navigateTo("/dashboard");
   // Handle the user's account here (e.g., send it to your backend)
  } catch (error) {
   console.error("MetaMask connection error:", error);
  }
 } else {
  alert("MetaMask is not installed. Please install MetaMask to use this feature.");
 }
};
</script>

<style>
/* Optional: Add custom gradients or other styles if needed */
</style>
