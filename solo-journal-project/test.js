const imgContainers = document.getElementsByClassName('img-container')
const container = imgContainers.item(0)
const img = container.firstElementChild
const imgNode = container.firstChild

console.log(img)
console.log(img.naturalHeight)
console.log(img.height) // 625
console.log(getComputedStyle(container).height)
console.log(getComputedStyle(container).width)
console.log(getComputedStyle(container))


const containerHeight = getComputedStyle(container).height.slice(0, -2)
const offset = (img.height - parseFloat(containerHeight)) / 2
console.log(offset)

img.style.top = `-${offset}px`
