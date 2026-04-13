<script setup lang="ts">
import { computed, ref } from 'vue'
import { cells, evalCell } from './store'

const { cols, rows } = defineProps<{
    cols: number
    rows: number
}>()
const curValue = computed(() => cells[cols]?.[rows] || '')

const editing = ref(false)

function updateCell(e: Event) {
    editing.value = false
    const target = e.target as HTMLInputElement
    if (cells[cols]) {
        cells[cols][rows] = target.value.trim()
    }
}
</script>

<template>
    <div class="cell" :title="curValue" @click="editing = true">
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

/* .cell:hover {
    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.06),
        0 8px 24px rgba(0, 0, 0, 0.04);
} */
</style>
