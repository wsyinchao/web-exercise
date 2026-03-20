<script setup lang="ts">
import { computed, ref } from 'vue'
import { capitalize } from 'lodash'

import type { TreeNode } from '../types'

const { data } = defineProps<{
    data: TreeNode
}>()

const isOpen = ref(false)
const isFolder = computed(() => {
    return data.children && data.children.length > 0
})

function click() {
    isOpen.value = !isOpen.value
}

function addChild(name: string = 'new stuff') {
    data.children = data.children || []
    data.children.push({ name })
}

function addChildren() {
    data.children = data.children || []
    data.children.push({
        name: 'child folder',
        children: [{ name: 'new stuff' }],
    })
}

/**
 * Here is a TODO:
 *
 * How would you collapse all the folders in the tree when you click on the root node?
 * In other words, when you click on the root node, all the folders in the tree should be collapsed (isOpen should be false for all nodes).
 */
</script>

<template>
    <li>
        <div :class="{ bold: isFolder }" @click="click">
            {{ capitalize(data.name) }}
            <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
        </div>

        <ul v-show="isOpen" v-if="isFolder">
            <Tree
                v-for="(child, index) in data.children"
                :key="index"
                :data="child"
            />
            <li class="bold" @click="addChild()">+</li>
            <li class="bold" @click="addChildren()">+++</li>
        </ul>
    </li>
</template>

<style lang="css" scoped>
.bold {
    font-weight: bold;
}

.capital {
    text-transform: capitalize;
}
</style>
