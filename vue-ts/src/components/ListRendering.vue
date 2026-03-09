<script setup lang="ts">
import { ref } from 'vue';

/**
 * v-for, 
 * We can use the v-for directive to render a list of items based on 
 * an array.
 */

// There is an array of people
const peoples = ref([
    {
        name: 'yc',
        age: 30,
    },
    {
        name: 'John Doe',
        age: 18,
    }
])

const particularPeople = {
    name: 'yinchao',
    age: 31,
}

const parentMessage = ref('hello')

function genRandomName() {
    return crypto.randomUUID()
}

</script>

<template>
    <!-- In what specific scenatios is it best practice to use
     the <template> tag within a Vue.js application? -->
    <!-- It is just a logical wrapper. Does not render to the DOM -->
    <!-- added by yinchao, Sat February 07 17:18	2026 -->
    <div>
        <ul>
            <li v-for="people in peoples">
                Hello {{ people.name }}, you are already {{ people.age }} years now.
            </li>
            <!-- Like v-if directive, controlling several tag elements at once. -->
            <!-- <template v-for="people in peoples">
            <li>{{ people.age }}</li>
            <li>{{ people.name }}</li>
        </template> -->
        </ul>
        <p v-for="n in 3">{{ n }}</p>
        <!-- destructing in v-for directive -->
        <p v-for="{ name } in peoples">{{ name }}</p>
        <!-- v-for in an array, seems like the forEach syntax -->
        <p v-for="({ age }, index) in peoples">{{ age }} - {{ index }}</p>

        <!-- v-for in an object -->
        <p v-for="(value, key, index) in particularPeople">{{ index }} - {{ key }} - {{ value }}</p>

        <!-- It's not recommanded to use v-if and v-for on the same element due to implicit precedence !!! -->

        <!-- maintaining state with key -->
        <hr>
        <ul>
            <!-- <template v-for="people in peoples"> -->
            <!-- <template v-for="people in peoples" :key="people.name"> -->
            <!-- It's recommended to provide a key attribute with v-for whenever possible,  -->
            <li v-for="people in peoples" :key="people.name">
                <!-- <li v-for="people in peoples"> -->
                {{ people.name }} - {{ people.age }}
            </li>
            <!-- </template> -->
        </ul>
        <button @click="peoples.reverse()">Click me to reverse the peoples array</button>
        <button @click="console.log(peoples)">Output the peoples to console </button>
    </div>
</template>

<style lang="css" scoped>
ul {
    margin: 0;
    padding: 0;
}

p {
    margin: 0;
}
</style>