<script setup lang="ts">
const { name = 'yc', age = 31 } = defineProps({
    name: String,
    age: String,
})
</script>

<template>
    <p>Hello {{ name }}, you are {{ age }}</p>
</template>

<style lang="css" scoped>
* {
    margin: 0;
}
</style>