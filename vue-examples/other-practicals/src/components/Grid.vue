<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Hero } from '../types'

const props = defineProps<{
    data: Hero[]
    columns: string[]
    filter: string
}>()

const { columns } = props

const sortKey = ref('')

// The expression "{} as Record<string, number>" is a type assertion,
// means that the empty object {} should be considered as a Record<string, number> type.
// Record<string, number> is a TypeScript utility type that represents an object with string keys and number values.
const sortOrders = ref<Record<string, number>>(
    columns.reduce(
        (o, key) => {
            o[key] = 1
            return o
        },
        {} as Record<string, number>,
    ),
)

const filteredData = computed(() => {
    const { data, filter } = props

    let result = data
    if (filter) {
        const filterLowerCase = filter.toLowerCase()
        result = result.filter((row) => {
            return Object.keys(row).some((key) => {
                return String(row[key as keyof Hero])
                    .toLowerCase()
                    .includes(filterLowerCase)
            })
        })
    }

    const key = sortKey.value
    if (key) {
        const order = sortOrders.value[key] ?? 1
        result = result.slice().sort((a, b) => {
            const aValue = a[key as keyof Hero]
            const bValue = b[key as keyof Hero]
            return (aValue === bValue ? 0 : aValue > bValue ? 1 : -1) * order
        })
    }
    return result
})

function sortBy(key: (typeof columns)[number]) {
    sortKey.value = key
    const currentOrder = sortOrders.value[key] ?? 1
    sortOrders.value[key] = currentOrder * -1
}

function capitalize(str: string) {
    // return str.charAt(0).toUpperCase() + str.slice(1)

    // The at(), codePointAt(), and for...of and spread operator are full Unicode-aware.
    // Should use these instead of charAt() and charCodeAt() whenever.
    return str.at(0)?.toUpperCase() + str.slice(1)
}
</script>

<template>
    <table>
        <thead>
            <tr>
                <th
                    v-for="key in columns"
                    @click="sortBy(key)"
                    :class="{ active: sortKey === key }"
                    :key="key"
                >
                    {{ capitalize(key) }}
                    <span
                        class="arrow"
                        :class="(sortOrders[key] ?? 1) > 0 ? 'asc' : 'des'"
                    ></span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in filteredData" :key="row.name">
                <td v-for="key in columns" :key="key">
                    {{ row[key as keyof Hero] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="css" scoped>
th.active {
    color: #fff;
}

table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
}

th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    user-select: none;
}

th,
td {
    min-width: 120px;
    padding: 10px 20px;
}

td {
    background-color: #f9f9f9;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
}

.arrow.des {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
}
</style>
