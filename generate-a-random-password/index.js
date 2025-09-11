import { characters } from './data.js'

let timeoutId = null

document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.getElementById('gen-btn')
    genBtn.addEventListener('click', genPassword)
    genBtn.addEventListener('click', genPasswordNoneSecure)

    const results = document.getElementById('results')
    results.addEventListener('click', copy2Clipboard)
})

function genPassword() {
    const lengthOfPassword = 8

    const pw1 = document.getElementById('pw-1')
    const pw2 = document.getElementById('pw-2')

    const key1 = new Uint8Array(lengthOfPassword)
    const key2 = new Uint8Array(lengthOfPassword)

    crypto.getRandomValues(key1)
    crypto.getRandomValues(key2)

    const key1Result = []
    key1.reduce((resultArr, value) => {
        resultArr.push(value.toString(16).padStart(2, '0'))
        return resultArr
    }, key1Result)

    const key2Result = []
    key2.reduce((resultArr, value) => {
        resultArr.push(value.toString(16).padStart(2, '0'))
        return resultArr
    }, key2Result)

    pw1.textContent = key1Result.join('')
    pw2.textContent = key2Result.join('')
}

function genPasswordNoneSecure() {
    const pw1 = document.getElementById('pw-1')
    const pw2 = document.getElementById('pw-2')

    const passwordLengthEl = document.getElementById('password-length')
    let lengthOfPassword = parseInt(passwordLengthEl.value)
    if (isNaN(lengthOfPassword)) {
        lengthOfPassword = 8
    }
    if (lengthOfPassword > characters.length) {
        lengthOfPassword = characters.length
    }

    const onlyNumberEl = document.getElementById('only-number')
    const isOnlyNum = onlyNumberEl.checked
    let [min, max] = [0, characters.length]
    if (isOnlyNum) {
        [min, max] = [52, 62]
    }

    const key1 = []
    const key2 = []
    let n = lengthOfPassword
    while (n--) {
        key1.push(characters[getRandomInt(min, max)])
        key2.push(characters[getRandomInt(min, max)])
    }

    pw1.textContent = key1.join('')
    pw2.textContent = key2.join('')
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function copy2Clipboard(e) {
    const classList = Array.from(e.target.classList)
    if (!classList.includes('result-plane')) {
        return
    }

    const popup = document.getElementById('pop-up')
    // const plane = document.getElementById(e.target.id)
    const plane = e.target
    if (!plane.textContent.trim()) {
        return
    }

    navigator.clipboard.writeText(plane.textContent).then(v => {
        popup.classList.remove('display-none')
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            popup.classList.add('display-none')
            timeoutId = null
        }, 1000);
    })
}