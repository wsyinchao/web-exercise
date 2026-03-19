<script setup lang="ts">
import { ref } from 'vue'
import Grid from './Grid.vue'

import type { Hero } from '../types'

const searchQuery = ref('')
const gridColumns = ['name', 'power']
const gridData = ref<Hero[]>([
    { name: 'Chuck Norris', power: Infinity },
    { name: 'Bruce Lee', power: 9000 },
    { name: 'Jackie Chan', power: 7000 },
    { name: 'Jet Li', power: 8000 },
])
</script>

<template>
    <div class="root">
        <form id="search">
            Search
            <input
                type="text"
                name="query"
                v-model="searchQuery"
                placeholder="Type your search..."
            />
        </form>
        <Grid :data="gridData" :columns="gridColumns" :filter="searchQuery" />
    </div>
</template>

<style lang="css" scoped>
.root {
    font-size: 1.25rem;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    padding: 1em;
}

input {
    font-size: inherit;
    font-family: inherit;
    padding: 0.25em 0.5em;
}

input::placeholder {
    color: #888;
    font-style: italic;
}
</style>
