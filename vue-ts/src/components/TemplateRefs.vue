<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watchEffect } from 'vue';

// const inputName = useTemplateRef<HTMLInputElement>('input-name')
const inputName = useTemplateRef('input-name') // type inferred as HTMLInputElement | null

watchEffect(() => {
    // if (inputName.value) {
    //     console.log(`The input value is: ${inputName.value.value}`);
    // }
})

// useTemplateRef with v-for
// const items = useTemplateRef<HTMLLIElement[]>('items')
const items = useTemplateRef('items') // type inferred as HTMLLIElement[] | null

onMounted(() => {
    if (inputName.value) {
        inputName.value.focus()
    }

    if (items.value) {
        console.log(items.value.map(item => item.textContent));
    }
})

</script>

<template>
    <div>
        <input type="text" name="input-name" ref="input-name" placeholder="Enter your name">
        <ul>
            <li v-for="(item, index) in [1, 2, 3]" :key="index" ref="items">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<style lang="css" scoped>
input {
    font-family: inherit;
    font-size: inherit;
    padding: .25em .5em;
}
</style>