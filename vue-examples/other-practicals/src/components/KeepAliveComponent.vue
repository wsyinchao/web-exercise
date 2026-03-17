<script setup lang="ts">
import { shallowRef } from 'vue'

import CompA from './CompA.vue'
import CompB from './CompB.vue'

const current = shallowRef(CompA)
</script>

<template>
    <div class="root">
        <h1>Keep Alive Component</h1>

        <label for="comp-a">
            <input type="radio" id="comp-a" v-model="current" :value="CompA" />
            Comp A
        </label>
        <label for="comp-b">
            <input type="radio" id="comp-b" v-model="current" :value="CompB" />
            Comp B
        </label>

        <KeepAlive>
            <component :is="current" />
        </KeepAlive>
    </div>
</template>

<style lang="css" scoped>
.root {
    padding: 1em;
    font-size: 1.2rem;
}
</style>
