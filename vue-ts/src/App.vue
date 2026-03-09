<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, ref, toValue } from "vue";
import ConditionalRendering from "./components/ConditionalRendering.vue";
import ListRendering from "./components/ListRendering.vue";
import PropertiesInComponents from "./components/PropertiesInComponents.vue";
import Vmodel from "./components/V-model.vue";
import Watch from "./components/Watch.vue";
import TemplateRefs from "./components/TemplateRefs.vue";
import ComponentsBasics from "./components/ComponentsBasics.vue";

/**
 * Using composition is better than using class inheritance.
 * // Fri February 06 14:04	2026
 */

/**
 * getter and setter vs proxy
 * The formar is a property-level hook and the latter is an object-level interceptor.
 * You can think in: the formar is custom logic for a specific field and the latter is a middleware of an object.
 */

/**
 * Template syntax
 * 
 * 1. Text interpolation, "mustache" syntax. {{ some-variable }}
 * 2. Attribute binding, v-bind:attribute-name="some-variable"
 * 3. JavaScript expressions can also used in the text interpolation
 * 4. Dynamic attribute of the v-* directive. v-bind:[dynamic-attribute]="value"
 * 5. Modifiers to the v-* directives.
 */

/**
 * Reactivity Fundamentals
 * 1. The recommanded way to create a reactive status is using the ref() function, 
 * 2. Deep reactivity vs shallow ref 
 * 3. DOM update timing, (await nextTick())
 * 4. reactive 方法,
 * 5. a ref object is automatically unwrapped when accessed or mutated in template or as a property 
 *  of a reactive object.
 * 6. Ref unwrapping in templates only applies if the ref is a top-level property in the template render context.
 */

/**
 * Computed properties
 * 1. Computed properties can cached based on their reactive dependencies.
 * 2. avoid mutating computed value
 */

/**
 * class and style bindings
 */

// datas
const count = ref(0)
const name = ref('yc')
const reactivityStatus = ref<number | string>(0)
// Binding multiple attributes at once via v-bind directive.
const multipleVariables = {
    id: 'test-container',
    class: 'wrapper',
    style: 'font-size: 2em; color: red',
}
const isActive = ref(false)
const isActive2 = ref(true)
const errorClass = 'error-class'
// Supporting JavaScript expressions
const ns = ref([1, 2, 4])

const isInclude5 = computed(() => ns.value.includes(5))

// methods used to change the datas in this file defined above
function increment() {
    // Noticed: using the value property
    // But it doesn't needed in template
    count.value++
}
function push5toNs() {
    if (!ns.value.includes(5)) {
        ns.value.push(5)
    } else {
        ns.value.splice(ns.value.findIndex(ele => ele === 5), 1)
    }
}
function purefunc<T>(msg: T) {
    return 'test'
}
function dataTesting() {
    const pEle = document.getElementById('data-test')
    // console.log(pEle?.dataset)
}
function dynamicAttr() {
    return 'data-' + crypto.randomUUID()
}
function onClick() {
    console.log('Hello, This is onClick function')
}

async function awaitNextTick() {
    // await nextTick()

    // Now, The DOM has already been updated
    // ...

    /**
     * English times
     * 
     * Has done vs Has been done
     * The formar focus on 'who did the action';
     * The latter focus on the action/result, not the doer.
     */
}

// lifetime function
onMounted(() => {
    console.log('The App.vue is mounted to this page.')
})
onUpdated(() => {
    dataTesting()
})
</script>

<template>
    <!-- props primary -->
    <PropertiesInComponents name="yinchao" age="29" />
    <hr>

    <!-- rendering list -->
    <ListRendering />
    <hr>

    <h1>You did it!</h1>
    <p>
        Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
        documentation
    </p>
    <!-- <button @click="count++">The value of count is {{ count }}</button> -->
    <button @click="increment">The value of count is {{ count }}</button>

    <!-- Binding multiple variable at once via the v-bind directive -->
    <p v-bind="multipleVariables">Look here, I have three attributes</p>
    <p>Supporting JavaScript expressions like "ns.reverse().join(',')" {{ ns.toReversed().join(',') }}</p>
    <!-- class and style bindings, object syntax and array syntax -->
    <!-- Also support for the style attribute -->
    <p :class="{ active: isActive }" @click="isActive = !isActive" style="cursor: pointer;">
        Class and inline style bindings
    </p>
    <p :class="[{ active: isActive2 }, errorClass]" @click="isActive2 = !isActive2" style="cursor: pointer;">
        Class and inline style bindings -- array
    </p>

    <!-- The v-bind directive support calling a function defined in components -->
    <p id="data-test" :data-test="purefunc('')">Binding data to the special attribute data-*</p>
    <p>The value "{{ purefunc('') }}" is returned by the function 'purefunc' defined in components</p>

    <!-- dynamic argument for v-bind directive -->
    <p :[name]="1">dynamic argument for the v-bind directive</p>
    <p :[dynamicAttr()]="1">dynamic argument for the v-bind directive</p>

    <!-- modifiers .prevent is equals to event.preventDefault() -->
    <p @click.prevent="onClick" data-to-be-click=""> Watch the console while click me!</p>

    <!-- 响应式基础 -->
    <!-- added by yinchao, Fri February 06 13:53	2026 -->

    <!-- 计算属性 -->
    <!-- 可点击的元素 还是要使用 button 元素做, It's bettern than other elements -->
    <p>Is include the 5 element? <span>👉{{ isInclude5 }}</span> <span class="click-p" @click="push5toNs"> Click me to
            add the 5 element</span></p>

    <!-- Conditional Redenering -->
    <ConditionalRendering />

    <!-- v-model -->
    <Vmodel />

    <!-- wathers -->
    <!-- The function watch vs watchEffect -->
    <!-- https://cn.vuejs.org/guide/essentials/watchers.html#watch-vs-watcheffect -->
    <Watch />

    <!-- Template refs -->
    <hr />
    <TemplateRefs />

    <!-- Components basics -->
    <hr />
    <ComponentsBasics msg="no-change-event" />
    <ComponentsBasics @change="value => console.log(value)"/>
</template>

<style scoped>
* {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.7rem;
}

p[data-to-be-click],
.click-p {
    margin: 0;
    padding: .5em 1em;
    background-color: aquamarine;
    font-weight: bold;
    text-decoration: underline;
    display: inline-block;
    border-radius: 12px;
    transition: all .1s ease;
    cursor: pointer;
}

p[data-to-be-click]:hover,
.click-p:hover {
    background-color: aqua;
    padding: .51em 1.1em;
}

p[data-to-be-click]:active,
.click-p:active {
    font-size: 1.71rem;
}

.active {
    background-color: bisque;
    padding: .7em 1em;
    border-radius: 12px;
    margin: 0;
    display: inline-block;
}
</style>
