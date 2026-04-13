<script setup lang="ts">
import Cell from './Cell.vue'
import { cells } from './store'

const cols = cells.map((_, i) => String.fromCharCode(65 + i))
</script>

<template>
    <table>
        <thead>
            <tr>
                <th></th>
                <th v-for="col in cols" :key="col">{{ col }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="i in cells[0]?.length" :key="i">
                <th>{{ i - 1 }}</th>
                <td v-for="(_, j) in cols" :key="j">
                    <Cell :cols="j" :rows="i - 1" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="css" scoped>
table {
    font-size: 1.125rem;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

th {
    background-color: #eee;
}

tr:first-of-type th {
    width: 100px;
}

tr:first-of-type th:first-of-type {
    width: 30px;
}

td {
    border: 1px solid #ccc;
    height: 1.5em;
    overflow: hidden;
}
</style>
