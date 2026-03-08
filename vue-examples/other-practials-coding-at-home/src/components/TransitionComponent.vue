<script setup lang="ts">
import { ref } from "vue"

const show = ref(true)
const showSlide = ref(true)
</script>

<template>
    <div class="root">
        <button @click="show = !show">Toggle</button>
        <Transition>
            <div v-if="show" class="box">Hello</div>
        </Transition>

        <button @click="showSlide = !showSlide">Toggle slide + fade</button>
        <Transition name="fade">
            <div v-if="showSlide" class="box">Hello</div>
        </Transition>
    </div>
</template>

<style lang="css" scoped>
.root {
    font-size: 1.25rem;
    padding: 0.5em;
    font-family: "Courier New", Courier, monospace;
}

button {
    font-size: inherit;
    font-family: inherit;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5em 1em;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.5s ease-out;
}

.fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-leave-to,
.fade-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.box {
    margin-top: 0.25em;
    font-size: 50px;
}
</style>
