<!-- How can I test a single component? -->

<script setup lang="ts">
/**
 * conditional reendering
 * 1. v-if, v-else, v-elseif
 * 2. v-show
 */

import { ref } from 'vue';

const isActive = ref(true)
</script>

<template>
    <div>
        <button @click="isActive = !isActive">Toggle</button>
        <p v-if="isActive">Vue is awesome!</p>
        <p v-else>Ohh no 😥</p>

        <p v-show="isActive">Here is controlled by v-show directive ✌. Accomplished by the CSS attribut "display:none;"
        </p>

        <!-- controlling multiple elements at once -->
        <template v-if="isActive">
            <!-- some other normal tags in here. -->
        </template>
    </div>
</template>

<style scoped>
* {
    margin: 0;
}

button {
    border-radius: 12px;
    padding: .6em 1em;
    background-color: #242424;
    color: whitesmoke;
    border: none;
    font-size: inherit;
    font-family: inherit;
}
</style>