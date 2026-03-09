<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const checked = ref(false)
</script>

<template>
    <div>
        <!-- The basically usage -->
        <p>Hello, {{ name }}. Your hometown is {{ checked }}</p>
        <input v-model="name" placeholder="Enter your name">
        <br></br>
        <!-- Uesed with radio -->
        <input type="radio" name="hometown" id="hometown-HY" value="衡阳市" v-model="checked">
        <label for="hometown-HY">衡阳市</label>
        <input type="radio" name="hometown" id="hometown-CS" value="长沙市" v-model="checked">
        <label for="hometown-CS">长沙市</label>
        <br></br>
        <!-- Used with checkbox -->
    </div>
</template>

<style lang="css" scoped>
input {
    font-size: inherit;
    padding: .25em .5em;
    font-family: inherit;
}
</style>
