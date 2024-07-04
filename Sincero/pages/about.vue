<template>
  <div>
    <h1>Nuxt 3 DID JWT Integration</h1>
    <button @click="createJwt">Create JWT</button>
    <p></p>
    <button @click="numberPOST()">Return Number </button>
    <p v-if="jwt">JWT: {{ jwt }}</p>
    <p v-if="error" style="color: red;">Error: {{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let jwt = ref('');
const error = ref('');

async function createJwt() {
  try {
    const data = await $fetch('/api/create-jwt', {
      method: 'POST',
      body: {
        privateKey: "thisIsARealSecretLikeForRealDude" // Replace with actual private key
      }
    });

    jwt.value = data.jwt;
    error.value = '';

  } catch (err) {
    error.value = err.message;
    jwt.value = '';
  }
};


async function numberPOST() {
  console.log("clicked the post");
  const data = await $fetch('/api/submit', {
    method: 'POST',
    body: 123,
      headers: {
        'Content-Type': 'application/json'
      },
  }).then((res) => {
    console.log(res);
  });
}

async function returnNumberGET() {
  console.log("clicked!");
  const { body } = await $fetch('/api/submit', {
    method: 'get',
    body: { test: 123 }
  })
}

</script>

<style scoped>
  section {
    margin: 20px;
    padding: 20px;
    border: 1px solid #333;
  }

  p {
    color: #333;
  }

  h1 {
    color: #333;
  }

</style>