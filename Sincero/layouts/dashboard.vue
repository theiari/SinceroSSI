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
     </ul>
    </nav>
    <div class="flex items-center space-x-4">
     <div v-if="account"><b>Connected as: </b> {{ account }}</div>
    </div>
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
      <NuxtLink to="/dashboard/configuration" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:form-outlined" size="20px" class="mx-0.5" />Configuration</NuxtLink
      >
     </li>
     <li class="menu-item">
      <NuxtLink to="/dashboard/connections" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:usergroup-add-outlined" size="20px" class="mx-0.5" />Connections</NuxtLink
      >
     </li>
     <li class="menu-item">
      <NuxtLink to="/dashboard/credentials" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:audit-outlined" size="20px" class="mx-0.5" />Credentials
      </NuxtLink>
     </li>
     <li class="menu-item">
      <NuxtLink to="/dashboard/issuance" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:delivered-procedure-outlined" size="20px" class="mx-0.5" />Issuance</NuxtLink
      >
     </li>
     <li class="menu-item">
      <NuxtLink to="/dashboard/messages" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:message-outlined" size="20px" class="mx-0.5" />Messages</NuxtLink
      >
     </li>
     <li class="menu-item">
      <NuxtLink to="/dashboard/verification" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:security-scan-outlined" size="20px" class="mx-0.5" />Verification</NuxtLink
      >
     </li>
     <li class="menu-item">
      <NuxtLink to="/about" class="block py-2 px-4 text-gray-700 hover:bg-gray-300">
       <Icon name="ant-design:info-circle-outlined" size="20px" class="mx-0.5" />About</NuxtLink
      >
     </li>
     <li>
      <NuxtLink
       @click="goHome"
       class="block py-2 px-4 text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-300"
      >
       <Icon name="ant-design:logout-outlined" size="20px" class="mx-0.5" />
       Logout
      </NuxtLink>
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

async function goHome(){
 //invalidate the session
  await $fetch("/api/logout");
  navigateTo("/");
}
</script>
