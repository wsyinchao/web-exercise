<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

import gsap from 'gsap'

const number = ref(0)
// const tweened = reactive({
//     number: 0,
// })
// Using ref instead of reactive to make it work
const tweened = ref(number.value)

watch(number, (newValue) => {
    gsap.to(tweened, {
        duration: 0.5,
        value: Number(newValue) || 0,
    })
})
</script>

<template>
    <div class="root">
        Type a Number:
        <input type="number" name="number" id="number" v-model="number" />
        <!-- <p>{{ tweened.number.toFixed(0) }}</p> -->
        <p>{{ tweened.toFixed(0) }}</p>
    </div>
</template>

<style lang="css" scoped>
.root {
    padding: 1em;
    font-size: 1.5em;
    font-weight: bold;
}

input {
    padding: 0.2em 0.3em;
    font-size: inherit;
}
</style>
