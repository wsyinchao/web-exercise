<script setup lang="ts">
import { ref, watch, watchEffect, watchPostEffect } from 'vue';

const question = ref('');
// Callback flush timing - before DOM updates
watch(question, (newValue, oldValue) => {
    // console.log(`Question changed from ${oldValue} to ${newValue}`);

    const questionP = document.getElementById('question-p')
    if (questionP) {
        console.log(`The question element's text content is: "${questionP.textContent}" before DOM updates.`);
    }
});

// https://cn.vuejs.org/guide/essentials/watchers.html#watcheffect
watchEffect(() => {
    if (question.value) {
        console.log(`The question is now: ${question.value}`);
    }
})

// Callback flush timing - after DOM updates
watch(question, (newValue, oldValue) => {
    const questionP = document.getElementById('question-p')
    if (questionP) {
        console.log(`The question element's text content is: "${questionP.textContent}" after DOM updates.`);
    }
}, { flush: 'post' })

// watchPostEffect(() => {
//     const tempValue = question.value
//     const questionP = document.getElementById('question-p')
//     if (questionP) {
//         console.log(`The question element's text content is: "${questionP.textContent}" after DOM updates.`);
//     }
// })

// Callback flush timing - before any DOM updates
watch(question, (newValue, oldValue) => {
    console.log('Hi, I am a watcher with flush: "sync". I will run before any DOM updates.');
}, { flush: 'sync' })

// side effect cleanup
// https://cn.vuejs.org/guide/essentials/watchers.html#side-effect-cleanup

// stopping a watcher
/**
 * Watchers declared synchronously inside `setup` or `<script setup>` are bound 
 * to the owner component instance, and will be automatically stopped when the owner 
 * component is unmounted.
 */

/**
 * If you need to wait for some async data, 
 * you can make your watch logic conditional instead.
 */
const data = ref(null)
watchEffect(() => {
    if (data.value) {
        // Do something when data is loaded.
    }
})
</script>

<template>
    <div>
        <p id="question-p">Question: {{ question }}</p>
        <input v-model="question" placeholder="Enter your question">
    </div>
</template>

<style lang="css" scoped>
input {
    font-size: inherit;
    padding: .25em .5em;
    font-family: inherit;
}

p {
    margin-bottom: 0;
}
</style>