<template>
    <div class="bg-gray-100 min-h-screen flex flex-col">
   

   <main class="flex-grow">
     <section class="bg-cover bg-center h-screen" style="background: lightblue;">
       <div class="container mx-auto h-full flex items-center justify-center">
        
       
            <div class="flex flex-col items-center">
                <h1 class="text-4xl font-bold mb-8">Login</h1>
                <NuxtLink to="/api/auth/signin" external class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Login</NuxtLink>
            </div>

         
       </div>
     </section>
   </main>

 </div>
</template>

<script setup>

</script>

<style lang="css">

</style>