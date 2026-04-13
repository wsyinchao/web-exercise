// import './style.css'
import './index.css'

document.querySelector('#app').innerHTML = `<progress></progress>`

const totalTime = 15 * 1000
let process = null

function tween(start, end, duration, callback) {
    const startTime = performance.now()

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        const value = start + (end - start) * progress
        callback(value)

        if (progress < 1) {
            requestAnimationFrame(animate)
        } else {
            callback(end)
        }
    }

    requestAnimationFrame(animate)
}

tween(0, 1, totalTime, (value) => {
    if (!process) {
        process = document.querySelector('progress')
    }
    process.value = value
})
