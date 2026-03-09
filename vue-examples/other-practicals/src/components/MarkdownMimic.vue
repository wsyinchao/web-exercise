<script setup lang="ts">
import { marked } from "marked"
import { debounce } from "lodash"
import { computed, onMounted, ref, useTemplateRef } from "vue"

const textarea = useTemplateRef("textarea")
const input = ref("")

const output = computed(() => {
    return marked(input.value)
})

const update = debounce((e: InputEvent) => {
    input.value = (e.target as HTMLTextAreaElement).value
}, 100)

onMounted(() => {
    textarea.value?.focus()
})
</script>

<template>
    <div class="container">
        <div class="editor">
            <h2>edit</h2>
            <textarea
                ref="textarea"
                :value="input"
                @input="update"
                placeholder="Type your content here..."
            ></textarea>
        </div>
        <div class="preview">
            <h2>preview</h2>
            <div class="output" v-html="output"></div>
        </div>
    </div>
</template>

<style lang="css" scoped>
* {
    box-sizing: border-box;
    font-size: 1.25rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.container {
    display: flex;
    height: 100vh;
}

.editor,
.preview {
    width: 50%;
}

.editor {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc;
}

.editor,
.preview {
    padding-left: 1em;
}

h2 {
    text-transform: capitalize;
    font-size: 1.5rem;
}

textarea {
    resize: none;
    outline: none;
    border: none;
    width: 100%;
    flex: 1;
    padding: 0;
}
</style>
