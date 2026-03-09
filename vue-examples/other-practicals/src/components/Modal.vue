<script setup lang="ts">
const { show } = defineProps<{
    show: boolean
}>()

const emit = defineEmits<{
    (e: "close"): void
}>()
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="container">
            <div class="modal">
                <div class="header">
                    <slot name="header">Default Header</slot>
                </div>

                <div class="body">
                    <slot name="main">Default Body</slot>
                </div>

                <div class="footer">
                    <slot name="footer">Default Footer</slot>
                    <button @click="emit('close')">OK</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="css" scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.modal {
    width: 300px;
    min-height: 20vh;
    background-color: whitesmoke;
    border-radius: 5px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease;
}

.header {
    text-align: center;
    color: #42b983;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.25em 1em;
    cursor: pointer;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
