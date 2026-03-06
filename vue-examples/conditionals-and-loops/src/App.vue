<script setup lang="ts">
import { ref } from 'vue';

const show = ref(true)
const list = ref([1, 2, 3])
</script>

<template>
    <button @click="show = !show">toggle list</button>
    <button @click="list.push(list.length + 1)">push a number</button>
    <button @click="list.pop()">pop a number</button>
    <button @click="list.reverse()">reverse list</button>

    <ul v-if="show && list.length">
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
    <p v-else-if="list.length">The list is not empty, but hidden.</p>
    <p v-else>The list is empty.</p>
</template>

<style scoped>
button {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    padding: .25em .5em;
    font-size: 1.25rem;
    text-transform: capitalize;
    margin-right: .1em;
    cursor: pointer;
}

ul,
p {
    font-size: 1.5rem;
    font-family: 'Courier New', Courier, monospace;
}
</style>