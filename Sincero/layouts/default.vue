<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-lg">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">  

           <!-- <NuxtImg src="../logo.png"/> -->
           
           <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 transition duration-300"></NuxtLink>
        <nav class="flex-grow">
          <ul class="flex space-x-8 text-lg font-medium justify-start"> 
            <!-- <li><NuxtLink tag="img" src="../logo.svg "to="/" class="text-gray-600 hover:text-blue-600 transition duration-300">Home</NuxtLink></li> -->
            
            <img src="../logo.svg" style="width: 8%;">
            <li><NuxtLink to="/about" class="text-gray-600 hover:text-blue-600 transition duration-300">About</NuxtLink></li>
            <li><NuxtLink to="/products" class="text-gray-600 hover:text-blue-600 transition duration-300">Products</NuxtLink></li>
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
import image from '~/logo.svg'
</script>