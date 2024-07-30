<template>
    <div>
      <template v-if="isAuthenticated">
        <a
          class="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <p>This is the dashboard</p>
        </a>
      </template>
      <template v-else>
        <a
          class="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <p>You do not have access to the dashboard</p>
        </a>
      </template>
    </div>
  </template>
  
  <script setup>
  import { useAuth } from '~/composables/useAuth';
  
  const { isAuthenticated } = useAuth();
  </script>
  
  <style></style>