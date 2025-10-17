const ulE = document.querySelector('ul')
const lis = document.getElementsByClassName('card')
const btn = document.querySelector('button')

ulE.addEventListener('click', e => {
    let ele = null
    if (e.target.classList.contains('card')) {
        ele = e.target
    } else if (e.target.closest('.card')?.classList?.contains('card')) {
        ele = e.target.closest('.card')
    }

    if (ele) {
        for (let i = 0; i < lis.length; i++) {
            const ele = lis.item(i)
            ele.classList.remove('selected')
        }

        ele.classList.add('selected')
    }
})

btn.addEventListener('click', e => {
    let ele = null
    for (let i = 0; i < lis.length; i++) {
        if (lis.item(i).classList.contains('selected')) {
            ele = lis.item(i)
            break
        }
    }

    console.log(ele?.textContent)
})
