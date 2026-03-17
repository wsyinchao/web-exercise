<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

const input = ref('')
const inputEle = useTemplateRef('input-ele')

onMounted(() => {
    inputEle.value?.focus()
})
</script>

<template>
    <div class="root">
        <h1>Component A</h1>

        <p>Input: {{ input }}</p>
        <input
            v-model="input"
            placeholder="Type something..."
            ref="input-ele"
        />
    </div>
</template>

<style lang="css" scoped>
input {
    font-size: inherit;
    padding: 0.25em 0.5em;
    /* border-radius: 6px; */
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    font-family: inherit;
}
</style>
