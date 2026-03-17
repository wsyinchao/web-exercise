<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <div class="root">
        <h1>Component B</h1>

        <p>Count: {{ count }}</p>
        <button @click="count++">Increment</button>
    </div>
</template>

<style lang="css" scoped>
button {
    font-size: inherit;
    font-family: inherit;
    padding: 0.5em 1em;
    border-radius: 6px;
    border: none;
    outline: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

button:active {
    background-color: #007bff;
}
</style>
