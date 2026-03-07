<script setup lang="ts">
import { marked } from "marked"
import { debounce } from "lodash"
import { computed, onMounted, ref, useTemplateRef } from "vue";

const textareaElement = useTemplateRef("textarea")
const input = ref("")

const output = computed(() => marked(input.value))

const update = debounce((e: InputEvent) => {
    input.value = (e.target as HTMLTextAreaElement).value
}, 100)

onMounted(() => {
    textareaElement.value?.focus()
});
</script>

<template>
    <div class="container">
        <div class="editor">
            <h1>Markdown Editor</h1>
            <textarea ref="textarea" @input="update" placeholder="Enter your contents here..."></textarea>
        </div>

        <div class="preview">
            <h2>Preview:</h2>
            <div v-html="output" class="output"></div>
        </div>
    </div>
</template>

<style lang="css" scoped>
* {
    box-sizing: border-box;
}

h1 {
    padding: 0 10px;
}

.container {
    display: flex;
    height: 100vh;
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.25rem;
}

.editor {
    width: 50%;
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    border-right: 1px solid #ccc;
}

.editor textarea {
    flex: 1;
    width: 100%;
    height: 300px;
    padding: 10px;
    font-size: 1.25rem;
    border: none;
    outline: none;
    background-color: whitesmoke;
    resize: none;
}

.preview {
    width: 50%;
    background-color: white;
    padding: 0 10px;

    /* If the content (it's a very long word) causes the container to overflow,  */
    /* You can use the CSS property below to prevent overflow for long words. */
    /* overflow-wrap: break-word; */
}
</style>