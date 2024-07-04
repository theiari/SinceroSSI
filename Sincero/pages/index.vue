<template>
    
 <div class="bg-gray-100 min-h-screen flex flex-col">
  <main class="flex-grow">
   <section
    class="bg-cover bg-center h-screen"
    style="background-color: seagreen">
   
    <div class="container mx-auto h-full flex items-center justify-center">
     <div class="text-center text-white drop-shadow-lg animate-fade-in">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
       Welcome to <span class="text-blue-500">Sincero</span>
      </h1>
      <p class="mt-4 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
       An Hyperledger Aries based decentralized identity platform
      </p>
      <button
       class="mt-8 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-500 transition duration-300 transform hover:scale-105"
      >
       <NuxtLink to="/generate">Generate personal DID</NuxtLink>
      </button>
     </div>
    </div>
   </section>
  </main>
 </div>
</template>

<script setup>
// import { ES256KSigner, createJWT, hexToBytes, decodeJWT, verifyJWT  } from 'did-jwt';

// // ethrResolver = ethr.getResolver();
// const signer = ES256KSigner(hexToBytes('278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'));

// (async () => {
//   try {
//     const jwt = await createJWT(
//       { aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', iat: undefined, name: 'uPort Developer' },
//       { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
//       { alg: 'ES256K' }
//     );
//     console.log('This is the jwt: ',jwt);
//     let decoded = decodeJWT(jwt);
//     console.log('And this is the decoded JWT: ',decoded);
    
//     //TODO add jwt verification
//     // const resolver = new Resolver({...});
//     // verifyJWT(jwt, { resolver }).then(console.log).catch(console.error);
//   } catch (error) {
//     console.error('Error creating JWT:', error);
//   }
// })();
</script>
