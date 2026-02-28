const form = document.getElementById('form')
const input = document.getElementById('input')
// console.log(input)

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(input.value)
})

form.addEventListener('keyup', e => {
    e.preventDefault()
    console.log(e.key, e.code)
})

/**
 * Listen the keydown and call the preventDefault method when the key is the Tab
 */
form.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
        e.preventDefault()
    }
})
