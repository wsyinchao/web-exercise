import { items } from "./data.js";

const orderItemList = []
/**
 * Will this line of always work correctly?
 * Answer: No, It will not work always work correctly.
 * 
 * Whether it works depends on when the script runs relative to 
 * when the DOM is built.
 * 1. If your <script> is placed at the bottom of the <body>, it will work correctly.
 * 2. Query the element inside DOMContentLoaded, it will work correctly.
 * 3. Use defer in <script> if script is in <head>, `<script src="app.js" defer></script>`
 */
const popUp = document.getElementById('pop-up')
popUp.addEventListener('click', e => {
    if (e.target.id === 'pop-up-btn') {
        handlePayment()
    }
})

document.addEventListener('DOMContentLoaded', e => {
    render()
    renderOrderList()
})

document.addEventListener('click', e => {
    if (!popUp.classList.contains('display-none')) return

    if (e.target.dataset.title && e.target.dataset.price && e.target.dataset.uuid) {
        orderItemList.push(e.target.dataset)
        renderOrderList()
    }
    else if (e.target.dataset.uuid) {
        // orderItemList = orderItemList.filter(item => item.uuid !== e.target.dataset.uuid)
        const index = orderItemList.findIndex(item => item.uuid === e.target.dataset.uuid)
        orderItemList.splice(index, 1)
        renderOrderList()
    }
    else if (e.target.id === 'complete-order-btn') {
        handleCompletedOrder()
    }
})

function render() {
    const mountElement = document.getElementById('container')
    mountElement.innerHTML = items.map(item => {
        const { image, title, ingredients, price } = item
        const uuid = crypto.randomUUID()
        return `
        <div class="card">
            <div class="item-left">
                <img src="images/${image}" alt="An item image" class="item-image">
                <div class="item-detail">
                    <h2 class="item-title">${title}</h2>
                    <p class="item-ingredients">${ingredients}</p>
                    <p class="item-price">${price}</p>
                </div>
            </div>
            <button class="item-btn" data-title="${title}" data-price="${price}" data-uuid="${uuid}">+</button>
        </div>
        `
    }).join('')
}

function renderOrderList() {
    const mountElement = document.getElementById('check-out')
    const orderItem = orderItemList.map(item => {
        const { title, price, uuid } = item
        return `
            <div class="order-item">
                <div class="order-item-left">
                    <p class="order-item-name">${title}</p>
                    <button class="order-item-remove-btn" id="remove-btn" data-uuid="${uuid}">remove</button>
                </div>
                <div class="order-item-price">${price}</div>
            </div>
        `
    }).join('')

    let totalPrice = orderItemList.reduce((totalPrice, item) => parseFloat(item.price.slice(1)) + totalPrice, 0)
    totalPrice = Math.round(totalPrice * 100) / 100 // Keep 2 decimal places and round the number
    mountElement.innerHTML = orderItem === '' ? '' : `
        <h2 class="order-title">Your Order</h2>
        <div class="order-list">
            ${orderItem}
        </div>
        <div class="total-price-div">
            <h3 class="total-price-title">Total Price</h3>
            <p class="total-price">$${totalPrice}</p>
        </div>

        <button class="complete-order-btn" id="complete-order-btn">
            Complete order
        </button>
    `
}

function handleCompletedOrder() {
    popUp.classList.toggle('display-none')
}

function handlePayment() {
    popUp.classList.toggle('display-none')
    orderItemList.length = 0
    renderOrderList()
    renderOrderCompleteMessage()
}

function renderOrderCompleteMessage() {
    const mountElement = document.getElementById('check-out')
    mountElement.innerHTML = `
        <div class="order-completed">
            Thanks, James! Your order is on its way!
        </div>
    `
}
