<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-lg">
  <div class="container mx-auto px-6 py-2 flex justify-between items-center">  
    <NuxtLink to="/" class="flex items-center">
      <!-- Adjust the image size and move it a bit to the left -->
      <img src="../logo.svg" class="w-24 mr-4">
    </NuxtLink>
    <nav class="flex-grow">
      <ul class="flex space-x-8 text-lg font-medium justify-start">
        <!-- Remove flex items-center class from NuxtLink wrapping the image -->
        <li><NuxtLink to="/about" class="text-gray-600 hover:text-blue-600 transition duration-300">About</NuxtLink></li>
        <li><NuxtLink to="/dashboard" class="text-gray-600 hover:text-blue-600 transition duration-300">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/login" class="text-gray-600 hover:text-blue-600 transition duration-300">Login</NuxtLink></li>
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