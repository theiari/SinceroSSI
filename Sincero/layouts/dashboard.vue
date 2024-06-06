<template>
 <div class="min-h-screen flex flex-col">
  <header class="bg-white shadow-lg">
   <div class="container mx-auto px-6 py-2 flex justify-between items-center">
    <NuxtLink to="/" class="flex items-center">
     <!-- Adjust the image size and move it a bit to the left -->
     <img src="../logo.svg" class="w-24 mr-4" />
    </NuxtLink>
    <nav class="flex-grow">
     <ul class="flex space-x-8 text-lg font-medium justify-start">
      <!-- Remove flex items-center class from NuxtLink wrapping the image -->
      <li><NuxtLink to="/about" class="text-gray-600 hover:text-blue-600 transition duration-300">About</NuxtLink></li>
      <li>
       <NuxtLink to="/dashboard" class="text-gray-600 hover:text-blue-600 transition duration-300">Dashboard</NuxtLink>
      </li>
      <li><NuxtLink to="/login" class="text-gray-600 hover:text-blue-600 transition duration-300">Login</NuxtLink></li>
     </ul>
    </nav>
   </div>
  </header>
  <div class="flex flex-grow">
   <aside class="w-46 bg-gray-200 p-2" aria-label="Sidebar">
    <ul>
     <li class="menu-item">
      <NuxtLink to="/dashboard" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:dashboard-outlined" size="20px" class="mx-0.5" />Dashboard</NuxtLink
      >
     </li>
     <li class="menu-item">
      <NuxtLink to="/page2" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:form-outlined" size="20px" class="mx-0.5" />Configuration</NuxtLink
      >
     </li>
     <li class="menu-item">
      <NuxtLink to="/dashboard/connections" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:usergroup-add-outlined" size="20px" class="mx-0.5" />Connections</NuxtLink
      >
     </li>
     <li class="menu-item">
      <NuxtLink to="/page4" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:audit-outlined" size="20px" class="mx-0.5" />Credentials
      </NuxtLink>
     </li>
     <li class="menu-item">
      <NuxtLink to="/page5" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
        <Icon name="ant-design:delivered-procedure-outlined" size="20px" class="mx-0.5"
      />Issuance</NuxtLink>
     </li>
     <li class="menu-item">
      <NuxtLink to="/page6" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
        <Icon name="ant-design:message-outlined" size="20px" class="mx-0.5"
      />Messages</NuxtLink>
     </li>
     <li class="menu-item">
      <NuxtLink to="/page7" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
        <Icon name="ant-design:security-scan-outlined" size="20px" class="mx-0.5"
      />Verification</NuxtLink>
     </li>
     <li class="menu-item " >
      <NuxtLink to="/about" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
        <Icon name="ant-design:info-circle-outlined" size="20px" class="mx-0.5"
      />About</NuxtLink>
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
import image from "~/logo.svg";
import { Label } from "@/components/ui/label";
</script>
