<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';

const input = useTemplateRef('input')
const check = ref(false)
const checkedList = ref<string[]>([])
const picked = ref('one')
const selected = ref('')
const selectedMultiple = ref<string[]>([])

const name = ref('')

onMounted(() => {
    // This is called type guarding, we check if the input.value is not null before trying to access its properties or methods
    // if (input.value) {
    //     input.value.focus()
    // }
})
</script>

<template>
    <div>
        <!-- input element -->
        <h1>Form Binding Example</h1>
        <input v-model="name" placeholder="Enter your name" ref="input" />
        <p>Your name is: <span>{{ name }}</span></p>

        <!-- checkbox -->
        <hr />
        <h2>Checkbox Example</h2>
        <input type="checkbox" id="single-checkbox" v-model="check">
        <label for="single-checkbox">Checked: {{ check }}</label>

        <!-- checkbox multiple -->
        <hr />
        <h2>checkbox multiple</h2>
        <input type="checkbox" id="checkbox-milk" v-model="checkedList" value="milk">
        <label for="checkbox-milk">milk</label>
        <input type="checkbox" id="checkbox-water" v-model="checkedList" value="water">
        <label for="checkbox-water">water</label>
        <input type="checkbox" id="checkbox-ancohol" v-model="checkedList" value="ancohol">
        <label for="checkbox-ancohol">ancohol</label>
        <p v-if="checkedList.length">Checked items: [{{ checkedList.join(', ') }}]</p>
        <p v-else>No item was selected.</p>

        <!-- radio -->
        <hr />
        <h2>Radio Example</h2>
        <input type="radio" id="radio-one" v-model="picked" value="one">
        <label for="radio-one">radio one</label>
        <input type="radio" id="radio-two" v-model="picked" value="two">
        <label for="radio-two">radio two</label>
        <p>Picked radio: {{ picked }}</p>

        <!-- select -->
        <hr />
        <h2>Select Example</h2>
        <select v-model="selected" required>
            <option value="" disabled selected>Please select one option</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        <p v-if="selected">Selected value is: {{ selected }}</p>
        <p v-else>Haven't selected.</p>[

        <!-- Multiple Select -->
        <hr />
        <h2>Multiple Select Example</h2>
        <select v-model="selectedMultiple" multiple required>
            <option value="" disabled selected>Please select your favorite options</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        <p v-if="selectedMultiple.length">Selected values are: {{ selectedMultiple.join(', ') }}]</p>
        <p v-else>Haven't selected.</p>
    </div>
</template>

<style scoped>
div:first-of-type {
    --main-font-size: 1.2rem;
    --main-font-color: #1C1C1C;
}

input {
    font-size: 1rem;
    line-height: 1.5;
    padding: .2em .5em;
    margin-bottom: 10px;
    font-family: inherit;
}

p,
label {
    font-size: var(--main-font-size);
}

label:not(:first-of-type) {
    text-transform: capitalize;
    margin-right: .5em;
}

/* The CSS selectors  */
/* https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors */
p:first-of-type span {
    text-decoration: underline;
    text-transform: capitalize;
}

input[type="checkbox"] {
    margin: 0;
    margin-right: .25em;
    height: 13px;
    width: 13px;
}

h2 {
    text-transform: capitalize;
}

select {
    font-size: 1rem;
    line-height: 1.5;
    padding: .2em .5em;
    font-family: inherit;
    min-width: 100px;
}

/* 
    begin: the below code shows how to make the color to gray 
    if the select option is the default one.

    Causion: the default option must have the value of "" and the attribute of disabled and selected
    and the select element must have the attribute of required, otherwise the :invalid selector won't work.
 */

select:invalid {
    color: gray;
}

select option:not(:first-child) {
    color: var(--main-font-color);
}

/* end. */
</style>
