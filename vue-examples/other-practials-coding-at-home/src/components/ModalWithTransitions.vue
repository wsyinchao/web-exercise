<script setup lang="ts">
import { ref } from "vue"
import Modal from "./Modal.vue"

const showModal = ref(false)
</script>

<template>
    <div>
        <button id="show-modal" @click="showModal = true">show modal</button>
    </div>

    <Teleport to="body">
        <Modal :show="showModal" @close="showModal = false">
            <template #header>
                <h3>Custom Header</h3>
            </template>
        </Modal>
    </Teleport>
</template>

<style lang="css" scoped>
div {
    padding: 0.5em;
}

button {
    text-transform: capitalize;
    font-size: 1.25rem;
    padding: 0.5em 1em;
    cursor: pointer;
}
</style>
