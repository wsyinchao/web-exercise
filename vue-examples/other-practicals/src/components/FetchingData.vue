<script setup lang="ts">
import { ref, watchEffect } from 'vue'

interface Commits {
    sha: string
    url: string
    html_url: string
    author: {
        login: string
        html_url: string
    }
    commit: {
        author: {
            name: string
            email: string
            date: string
        }
        message: string
    }
}

const API_URL =
    'https://api.github.com/repos/vuejs/core/commits?per_page=3&sha='
const branches = ['main', 'minor']

const currentBranche = ref(branches[0])
const commits = ref<Commits[]>([])

watchEffect(async () => {
    const response = await fetch(`${API_URL}${currentBranche.value}`)
    commits.value = await response.json()
})

function truncate(v: string) {
    const newline = v.indexOf('\n')
    return newline > 0 ? v.slice(0, newline) : v
}

function formatDate(v: string) {
    return v.replace(/T|Z/g, ' ')
}
</script>

<template>
    <div class="root">
        <h1>latest vue core commits</h1>

        <div class="wrapper">
            <div class="branch-radio" v-for="branch in branches">
                <!-- 
                -- About the v-bind and v-model working together:
                -- 
                -- When the value of v-bind:value is equal to the value of v-model,
                -- the radio button will be selected.
                -->
                <input
                    type="radio"
                    :id="branch"
                    :value="branch"
                    v-model="currentBranche"
                />
                <label :for="branch">{{ branch }}</label>
            </div>
        </div>

        <p>vuejs/core@{{ currentBranche }}</p>

        <ul v-if="commits.length > 0">
            <li v-for="{ html_url, sha, author, commit } in commits" :key="sha">
                <a :href="html_url" target="_blank" class="commit">
                    {{ sha.slice(0, 7) }}
                </a>
                - <span class="message">{{ truncate(commit.message) }}</span>
                <br />
                by
                <span>
                    <a :href="author.html_url" target="_blank" class="author">
                        {{ commit.author.name }}
                    </a>
                    author
                </span>
                at
                <span class="date">{{ formatDate(commit.author.date) }}</span>
            </li>
        </ul>
    </div>
</template>

<style lang="css" scoped>
.root {
    padding: 1em;
    font-weight: bold;
}

h1 {
    text-transform: capitalize;
}

.wrapper {
    display: flex;
    gap: 0.5em;
}

.branch-radio {
    display: flex;
    align-items: center;
}

a {
    text-decoration: none;
    color: #42b883;
}

li {
    line-height: 1.5;
    margin-bottom: 20px;
}

.author,
.date {
    font-weight: bolder;
}
</style>
