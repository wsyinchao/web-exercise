const sectionScheme = document.getElementById('section-scheme')
const form = document.querySelector('form')
const schemeMode = document.getElementById('scheme-mode')
const colorWrapper = document.getElementById('color-wrapper')
const colorPicker = document.getElementById('color-picker')
const schemeList = document.getElementById('scheme-list')
const messageBox = document.getElementById('message-box')

const baseURL = 'https://www.thecolorapi.com'
const endpoint = '/scheme'

form.addEventListener('submit', e => {
    e.preventDefault()
    const mode = schemeMode.value
    const colorHex = colorPicker.value
    fetch(baseURL + endpoint + `?mode=${mode}&hex=${colorHex.slice(1)}`)
        .then(resp => resp.json())
        .then(value => {
            localStorage.setItem('colors', JSON.stringify(value.colors))
            renderScheme(value.colors)
        })
})

// Notice: the event input vs event change
colorPicker.addEventListener('input', e => {
    localStorage.setItem('color-seed', JSON.stringify(colorPicker.value))
    updateColorPickerBgColor(colorPicker.value)
})

schemeList.addEventListener('click', e => {
    // What is the elegant way to get the li element 
    // when I click on the div or p element?
    // 
    // The elegant way is to using the closest method.
    let hexValue = e.target.dataset.hexValue
    if (!hexValue) {
        // If the hexValue is undefined, that means you was clicked on 
        // the div or p element.
        hexValue = e.target.closest('li').dataset.hexValue
    }
    navigator.clipboard.writeText(hexValue).then(() => {
        messageBox.classList.remove('display-none')
        setTimeout(() => {
            messageBox.classList.add('display-none')
        }, 1250);
    })
})

function updateColorPickerBgColor(color) {
    if (color === null) return

    colorWrapper.style.backgroundColor = color
}

function renderScheme(colors) {
    if (colors === null) return

    const schemeListHtml = colors.map((color, index) => {
        const hexValue = color.hex.value
        return `
            <li class="scheme-li scheme-${index + 1}" data-hex-value="${hexValue}">
                <div class="scheme-color" style="background-color: ${hexValue}"></div>
                <p class="scheme-hex">${hexValue}</p>
            </li>
        `
    }).join('')
    schemeList.innerHTML = schemeListHtml
}

renderScheme(JSON.parse(localStorage.getItem('colors')))
updateColorPickerBgColor(JSON.parse(localStorage.getItem('color-seed')))
