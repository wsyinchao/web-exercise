<script setup lang="ts">
import { shuffle as _shuffle } from 'lodash'
import { ref } from 'vue'

const getInitialItems = () => [1, 2, 3, 4, 5]
const items = ref(getInitialItems())

function shuffle() {
    items.value = _shuffle(items.value)
}

function reset() {
    items.value = getInitialItems()
}

function insertInRandomPosition() {
    const randomIndex = Math.floor(Math.random() * (items.value.length + 1))
    items.value.splice(randomIndex, 0, items.value.length + 1)
}

function remove(item: number) {
    const index = items.value.indexOf(item)
    if (index !== -1) {
        items.value.splice(index, 1)
    }
}
</script>

<template>
    <div class="root">
        <button @click="shuffle">Shuffle</button>
        <button @click="reset">Reset</button>
        <button @click="insertInRandomPosition">
            Insert in random position
        </button>

        <TransitionGroup name="list" tag="ul" class="list">
            <li v-for="item in items" :key="item">
                {{ item }}
                <button @click.stop="remove(item)">x</button>
            </li>
        </TransitionGroup>
    </div>
</template>

<style lang="css" scoped>
.root {
    padding: 1em;
    font-size: 1.25rem;
}

button {
    font-size: inherit;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    padding: 0.25em 0.5em;
    margin-right: 0.5em;
}

.list {
    list-style: none;
    padding: 0;
}

li {
    margin-top: 0.125em;
    background-color: #eee;
    padding: 0.5em;
    font-weight: bold;
    border-radius: 0.25em;
}

/* Transition styles */
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0.01) translateY(30px);
}
</style>
