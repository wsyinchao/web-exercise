<script setup lang="ts">
import { computed, ref } from 'vue'
import { cells, evalCell } from './store'

const { col, row } = defineProps<{
    col: number
    row: number
}>()
const editing = ref(false)
const curValue = computed(() => cells[col]?.[row] ?? '')

function updateCell(e: Event) {
    editing.value = false
    const target = e.target as HTMLInputElement
    if (cells[col]) {
        cells[col][row] = target.value.trim()
    }
}
</script>

<template>
    <div class="cell" @click="editing = true">
        <input
            type="text"
            v-if="editing"
            :value="curValue"
            @change="updateCell"
            @blur="updateCell"
            @vue:mounted="({ el }: { el: HTMLInputElement }) => el.focus()"
        />
        <span v-else>{{ evalCell(curValue) }}</span>
    </div>
</template>

<style lang="css" scoped>
.cell,
.cell input {
    height: 1.5em;
    line-height: 1.5;
    font-size: 15px;
}

.cell span {
    padding: 0 6px;
}

.cell input {
    box-sizing: border-box;
    width: 100%;
}
</style>
