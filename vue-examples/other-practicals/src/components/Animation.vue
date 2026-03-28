<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

import gsap from 'gsap'

const number = ref(0)
const tweened = reactive({
    // A ref is automatically unwrapped when accessed
    // as a property of a reactive object, so we can directly use number instead of number.value
    // ////
    // About unwrapping,
    // see https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#additional-ref-unwrapping-details
    number: 0,
})

watch(number, (newValue) => {
    gsap.to(tweened, {
        duration: 0.5,
        number: Number(newValue) || 0,
    })
})

/**
 * to-do list
 * - what is the difference between ref and reactive?
 * - how to use gsap in both Vue and vanilla JS?
 * - how to use the watch function in Vue to watch for changes in a ref or reactive object?
 */

/**
 * ref:
 * It takes the argument and returns it wrapped within a ref object
 * with a value property that holds the inner value.
 * It's implementation uses a getter and setter
 * to track changes to the value property and trigger updates when it changes.
 *
 * reactive:
 * It takes an object and returns a reactive proxy of that object.
 * The reactive proxy tracks changes to the properties of the object
 * and triggers updates when any of those properties change.
 *
 * The document at here https://cn.vuejs.org/guide/extras/reactivity-in-depth.html
 */
</script>

<template>
    <div class="root">
        Type a Number:
        <input type="number" name="number" id="number" v-model="number" />
        <!-- <p>{{ tweened.number.toFixed(0) }}</p> -->
        <p>{{ tweened.number.toFixed(0) }}</p>
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
