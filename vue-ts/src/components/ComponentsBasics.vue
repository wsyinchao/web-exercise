<script setup lang="ts">
import { onMounted } from 'vue';

// passing props
// The more intuitive way to define props is using this syntax `defineProps<{msg: string}>()`(generic)
// defineProps<{
//     msg: number
// }>()

// The code above is equal to the following code, but the latter is more readable and reusable
interface Props {
    msg?: string
}
const { msg = 'default msg' } = defineProps<Props>()

// listening to events

// runtime
// const emit = defineEmits(['change']);

// type-based way to define emits
const emit = defineEmits<{
    (e: 'change', value: number): void
}>()

onMounted(() => {
    console.log(msg)
})

let count = 0
function handleClick(event: MouseEvent) {
    // console.log(event)
    emit('change', ++count)
}

// content distribution with slots
// https://cn.vuejs.org/guide/essentials/component-basics.html#content-distribution-with-slots

// dynamic components

// 
</script>

<template>
    <h1>{{ msg }}</h1>
    <button @click="handleClick" v-if="msg !== 'no-change-event'"> <span class="capitalize">click</span> me to
        <span>emit</span> the change event to the parent component</button>
</template>

<style lang="css" scoped>
h1 {
    font-weight: normal;
    margin: 0;
}

button {
    font-size: inherit;
    font-family: inherit;
    font-size: 1.7rem;
    padding: .25em .5em;
    background-color: aquamarine;
    cursor: pointer;
    border: none;
    border-radius: 12px;
    font-weight: bold;
    transition: all .1s ease;
}

button:hover {
    background-color: aqua;
    padding: .26em .6em;
}

button:active {
    font-size: 1.71rem;
}

span {
    text-transform: uppercase;
}

.capitalize {
    text-transform: capitalize;
}
</style>