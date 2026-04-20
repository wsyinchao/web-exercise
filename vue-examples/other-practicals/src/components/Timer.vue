<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const progressRatio = ref(0)
const duration = ref(0)
const maxDuration = 30
const step = 0.1

let animationFrameId: number | null = null

/**
 * The progressRatio is not tracked by the watchEffect here,
 * because the watchEffect tracks reactive values that are read inside it.
 */
watchEffect(() => {
    if (duration.value > 0) {
        const startTime = performance.now()
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId)
        }

        const updateProgress = () => {
            const elapsedTime = (performance.now() - startTime) / 1000
            progressRatio.value = Math.min(elapsedTime / duration.value, 1)

            if (elapsedTime < duration.value) {
                animationFrameId = requestAnimationFrame(updateProgress)
            } else {
                progressRatio.value = 1
            }
        }

        animationFrameId = requestAnimationFrame(updateProgress)
    } else {
        progressRatio.value = 0
    }
})
</script>

<template>
    <div class="root">
        <label for="progress">
            Elapsed Time:
            <progress :value="progressRatio" id="progress"></progress>
        </label>
        {{ (progressRatio * duration).toFixed(1) }}s

        <label for="duration">
            Duration:
            <input
                type="range"
                name="duration"
                id="duration"
                :max="maxDuration"
                :step="step"
                v-model="duration"
            />
            {{ duration }}s
        </label>
    </div>
</template>

<style lang="css" scoped>
.root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    font-size: 2rem;
    font-weight: bold;
    gap: 0.5em;
    padding-left: 2em;
}

label {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

input[type='range'] {
    width: 200px;
}
</style>
