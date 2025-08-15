const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W",
    "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$",
    "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|",
    ":", ";", "<", ">", ".", "?", "/"];

/**
 * Prefer the generateKey() method for key generation, which is guaranteed to be running in a secure context.
 * refer to https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
 */

const lengthOfPassword = 8

function generateKeys() {
    const pw1 = document.getElementById('pw-1')
    const pw2 = document.getElementById('pw-2')

    const key1 = new Uint8Array(lengthOfPassword)
    const key2 = new Uint8Array(lengthOfPassword)

    crypto.getRandomValues(key1)
    crypto.getRandomValues(key2)

    // 不能使用 map, 装载不下
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

///

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function generateKeysNoneScure() {
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
    // 下面这种写法并不属于语法错误, 而是 min 为 undefined, max 为 [0, characters.length]
    // 所以 google chrome devtools 并不报错
    // let min, max = [0, characters.length]
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

function generateKeyUsingGenerateKey() {
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
    // generateKey 这个方法不是这么用的
    // 使用示例如下: https://github.com/mdn/dom-examples/blob/main/web-crypto/sign-verify/hmac.js
    // Fri August 15 10:59	2025
    crypto.subtle.generateKey({ name: 'HMAC', hash: { name: 'SHA-512' } }, true, ['sign', 'verify']).then(key => {
        console.log(key)
    })
}

function copyToClipboard(id) {
    const tag = document.getElementById(id)
    navigator.clipboard.writeText(tag.textContent).then(() => {
        alert(`The password "${tag.textContent}" Has copied to clipboard`);
    })
}