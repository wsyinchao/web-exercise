<script setup lang="ts">
import { ref } from 'vue';

const greetMsg = ref('Hello, Vue 3!');
const isRed = ref(true);
const color = ref('blue');

function toggleRed() {
    isRed.value = !isRed.value;
}

function toggleColor() {
    color.value = color.value === 'blue' ? 'green' : 'blue';
}

</script>

<template>
    <p>
        <span :title="greetMsg">
            Hover your mouse over me a few seconds to see my dynamically bound title
        </span>
    </p>

    <!-- class and style binding  -->
    <p :class="{ red: isRed }" @click="toggleRed">This should be red ... but click me to toggle it.</p>

    <!-- The { color } syntax is an abbreviation for { color: someColor } 
     when the name of an attribute is the same as the variable -->
    <p :style="{ color }" @click="toggleColor">This should be blue, and should be toggle between green and blue on click
    </p>
</template>

<style scoped>
* {
    font-size: 1.7rem;
}

.red {
    color: red;
}

p:first-of-type {
    font-weight: bold;
}

p {
    cursor: pointer;
}
</style>

<style scoped>
* {
    font-size: 1.7rem;
}

.red {
    color: red;
}

p {
    cursor: pointer;
}
</style>
