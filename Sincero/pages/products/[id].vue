<template>
    <div>
        <p>Product page content for {{ id }}</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum incidunt eius reprehenderit, in expedita et, dolores qui beatae nemo nostrum eligendi doloribus fuga iure labore, repellat quam illo quis ipsam?</p>
    </div>
</template>

<script setup>
const{ id} = useRoute().params;
</script>

<style scoped>

</style>