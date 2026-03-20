<script setup lang="ts">
import { ref } from 'vue'
import Tree from './Tree.vue'

import type { TreeNode } from '../types'

const treeData = ref<TreeNode>({
    name: 'My Tree',
    children: [
        { name: 'hello' },
        { name: 'world' },
        {
            name: 'child folder',
            children: [
                {
                    name: 'child folder',
                    children: [{ name: 'hello' }, { name: 'world' }],
                },
                { name: 'hello' },
                { name: 'world' },
                {
                    name: 'child folder',
                    children: [{ name: 'hello' }, { name: 'world' }],
                },
            ],
        },
    ],
})
</script>

<template>
    <ul>
        <Tree class="item" :data="treeData" />
    </ul>
</template>

<style lang="css" scoped>
.item {
    cursor: pointer;
    line-height: 1.5;
    font-size: 1.25rem;
    user-select: none;
}
</style>
