<template>
 <div class="bg-gray-100 min-h-screen flex flex-col">
  <main class="flex-grow">
   <section class="bg-cover bg-center h-screen" style="background-color: seagreen">
    <div class="container mx-auto h-full flex items-center justify-center">
     <div class="text-center text-white drop-shadow-lg animate-fade-in">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
       Welcome to <span class="text-blue-500">Sincero</span>
      </h1>
      <p class="mt-4 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
       A Self Sovereign Identity identity platform
      </p>
      <button
       class="mt-8 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-500 transition duration-300 transform hover:scale-105"
      >
       <NuxtLink to="/dashboard">Go to the dashboard</NuxtLink>
        </button>
     </div>
    </div>
   </section>
  </main>
 </div>
</template>

<script setup>
function setLocalStorage(key, value) {
    console.log(key, value, "clicked!");

 localStorage.setItem(temp, value);
}
function getLocalStorage(key) {
    console.log(localStorage.getItem(key), "clicked!")
 return localStorage.getItem(key+1);
}

</script>