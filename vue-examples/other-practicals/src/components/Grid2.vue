<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Hero } from '../types'

const { data, columns, search } = defineProps<{
    columns: string[]
    data: Hero[]
    search: string
}>()

const sortKey = ref<keyof Hero | ''>('')
const sortOrders = ref(
    columns.reduce(
        (acc, column) => {
            acc[column] = 1
            return acc
        },
        {} as Record<string, number>,
    ),
)

function capitalize(str: string) {
    return str.at(0)?.toUpperCase() + str.slice(1)
}

function sortBy(key: keyof Hero) {
    sortKey.value = key
    sortOrders.value[key] = (sortOrders.value[key] ?? 1) * -1
}

const filteredData = computed(() => {
    const sortKeyValue = sortKey.value
    const order = sortOrders.value[sortKeyValue] ?? 1

    let result = data
    if (search) {
        const searchLower = search.toLowerCase()
        result = result.filter((item) => {
            return Object.values(item).some((value) => {
                return String(value).toLowerCase().includes(searchLower)
            })
        })
    }

    if (sortKeyValue) {
        result = result.toSorted((a, b) => {
            const aValue = a[sortKeyValue]
            const bValue = b[sortKeyValue]
            if (aValue === bValue) return 0
            return aValue > bValue ? order : -order
        })
    }
    return result
})
</script>

<template>
    <table>
        <thead>
            <tr>
                <th
                    v-for="column in columns"
                    :key="column"
                    @click="sortBy(column as keyof Hero)"
                    :class="{ active: sortKey === column }"
                >
                    {{ capitalize(column) }}
                    <span
                        class="arrow"
                        :class="(sortOrders[column] ?? 1) > 0 ? 'asc' : 'desc'"
                    ></span>
                </th>
            </tr>
        </thead>

        <TransitionGroup tag="tbody" name="fade">
            <tr v-for="hero in filteredData" :key="hero.name">
                <td>{{ capitalize(hero.name) }}</td>
                <td>{{ hero.power }}</td>
            </tr>
        </TransitionGroup>
    </table>
</template>

<style lang="css" scoped>
table {
    margin-top: 0.1em;
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
}

th {
    background: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    user-select: none;
}

td {
    background: #f9f9f9;
}

th,
td {
    min-width: 120px;
    padding: 10px 20px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

/* A way of defining a small triangle using CSS borders */
.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
}

.arrow.desc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
}

/* Transition styles */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* .fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.01) translateY(30px);
} */

.fade-leave-active {
    position: absolute;
}
</style>
