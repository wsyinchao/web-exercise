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
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        default header
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        default footer
                        <button class="modal-default-button" @click="emit('close')">
                            OK
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="css" scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 300px;
    margin: auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
    padding: .25em .5em;
    font-size: 1rem;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

/**
 * @css
 * The following CSS classes are used for the modal's enter and leave transitions:
 * - `.modal-enter-from .modal-container`: Initial state of the modal when entering, scaled up to 1.1 times its size.
 * - `.modal-leave-to .modal-container`: Final state of the modal when leaving, also scaled up to 1.1 times its size.
 * 
 * @transition
 * The modal uses a scaling effect during its entrance and exit animations to create a smooth visual transition.
 */
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
