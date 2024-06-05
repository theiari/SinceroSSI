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
        <li><NuxtLink to="/products" class="text-gray-600 hover:text-blue-600 transition duration-300">Products</NuxtLink></li>
      </ul>
    </nav>
  </div>
</header>
    <div class="flex flex-grow">
      <aside class="w-48 bg-gray-200 p-4">
        <ul>
          <li class="menu-item">
            <NuxtLink to="/dashboard" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">Dashboard</NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink to="/page2" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">Configuration</NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink to="/dashboard/connections" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">Connections</NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink to="/page4" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">Credentials</NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink to="/page5" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">Issuance</NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink to="/page6" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">Messages</NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink to="/page7" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">Verification</NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink to="/about" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">About</NuxtLink>
          </li>
        </ul>
      </aside>
      
      <main class="flex-grow bg-gray-50 p-3">
        <!-- Use <NuxtPage /> to inject page content -->
        <NuxtPage />
      </main>
    </div>
    
    <footer class="bg-gray-800 text-gray-400">
      <div class="container mx-auto px-6 py-1 text-center">
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
