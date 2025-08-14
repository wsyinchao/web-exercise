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

function copyToClipboard(id) {
    const tag = document.getElementById(id)
    navigator.clipboard.writeText(tag.textContent).then(() => {
        alert("Have copied to clipboard");
    })
}