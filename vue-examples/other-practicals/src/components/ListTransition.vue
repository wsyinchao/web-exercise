<script setup lang="ts">
import { shuffle as _shuffle } from 'lodash'
import { ref } from 'vue'

const getInitialItems = () => [1, 2, 3, 4, 5]
const items = ref(getInitialItems())
let id = items.value.length + 1

function shuffle() {
    items.value = _shuffle(items.value)
}

function insert() {
    const i = Math.floor(Math.random() * items.value.length)
    items.value.splice(i, 0, id++)
}

function reset() {
    items.value = getInitialItems()
    id = items.value.length + 1
}

function remove(item: number) {
    const index = items.value.indexOf(item)
    items.value.splice(index, 1)
}
</script>

<template>
    <div class="root">
        <button @click="insert">insert at random index</button>
        <button @click="reset">reset</button>
        <button @click="shuffle">shuffle</button>

        <TransitionGroup tag="ul" name="fade" class="container">
            <li v-for="item in items" :key="item" class="item">
                {{ item }}
                <button @click="remove(item)">x</button>
            </li>
        </TransitionGroup>
    </div>
</template>

<style lang="css" scoped>
.root {
    padding: 1em;
    font-size: 1.2rem;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
}

button {
    text-transform: capitalize;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    margin-right: 0.5em;
}

.container {
    list-style: none;
    padding: 0;
    position: relative;
}

li {
    background-color: #eee;
    padding: 0.25em;
    border-radius: 5px;
}

li:not(:last-child) {
    margin-bottom: 0.1em;
}

/* Transition styles */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.01) translateY(30px);
}
.fade-leave-active {
    position: absolute;
}
</style>
