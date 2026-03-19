<script setup lang="ts">
import Grid2 from './Grid2.vue'

import { onMounted, ref, useTemplateRef } from 'vue'

import type { Hero } from '../types'

const search = ref('')
const columns = ['name', 'power']
const data: Hero[] = [
    { name: 'Goku', power: 9000 },
    { name: 'Vegeta', power: 8500 },
    { name: 'Gohan', power: 7000 },
    { name: 'Chuck Norris', power: Infinity },
    { name: 'Bruce Lee', power: 9000 },
    { name: 'Jackie Chan', power: 7000 },
    { name: 'Jet Li', power: 8000 },
]

const inputEle = useTemplateRef<HTMLInputElement>('search-input')

onMounted(() => {
    inputEle.value?.focus()
})
</script>

<template>
    <div class="root">
        <h1>Grid</h1>

        <form>
            <label for="search-input">
                Search:
                <input
                    type="text"
                    name="search-input"
                    id="search-input"
                    placeholder="Searching here..."
                    v-model="search"
                    ref="search-input"
                />
            </label>
        </form>

        <Grid2 :columns="columns" :data="data" :search="search" />
    </div>
</template>

<style lang="css" scoped>
.root {
    padding: 1em;
    font-size: 1.125rem;
    font-weight: bold;
}

label {
    font-size: 1.5rem;
    line-height: 2;
}

input {
    padding: 0.5em;
    font-size: inherit;
    font-family: inherit;
    font-weight: bold;
}

input::placeholder {
    font-style: italic;
}
</style>
