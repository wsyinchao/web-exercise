<script setup lang="ts">
import { ref } from "vue"
import Modal from "./Modal.vue"

const show = ref(false)
</script>

<template>
    <div class="root">
        <button @click="show = true">Show Modal</button>

        <Teleport to="body">
            <Modal :show="show" @close="show = false">
                <template #header>
                    <h2>Custom Header</h2>
                </template>
            </Modal>
        </Teleport>
    </div>
</template>

<style lang="css" scoped>
.root {
    padding: 1em;
    font-family: "Courier New", Courier, monospace;
}

button {
    padding: 0.5em 1em;
    font-size: 1.2rem;
    font-family: inherit;
    font-weight: bold;
    text-transform: capitalize;
    cursor: pointer;
}
</style>
