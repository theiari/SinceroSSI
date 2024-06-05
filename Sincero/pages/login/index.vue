<template>
    <div class="bg-gray-100 min-h-screen flex flex-col">
   

   <main class="flex-grow">
     <section class="bg-cover bg-center h-screen" style="background: lightblue;">
       <div class="container mx-auto h-full flex items-center justify-center">
        
       
            <div class="flex flex-col items-center">
                <h1 class="text-4xl font-bold mb-8">Login</h1>
                <form class="">
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                    </div>
                    <NuxtLink to="dashboard" class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Login</NuxtLink>
                </form>
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