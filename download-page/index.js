import { metadata } from "./metadata.js"
import { updateInfo } from "./updateInfo.js"
import { comments } from "./comments.js"
import { introduction } from "./introduction.js"

const detailMoreText = document.getElementById('detail-more-text')
const detailMoreBtn = document.getElementById('detail-more-btn')
const updateInfoContainer = document.getElementById('update-info-container')
const msgBox = document.getElementById('msg-box')
const weixinOpenTip = document.getElementById('weixin-open-tip-img')
const updateInfoTitle = document.getElementById('update-info')
const rateAvgContainer = document.getElementById('rate-avg-container')
const commentCards = document.querySelector('.section-5 ul')
const section3 = document.getElementById('section-3')

const appStoreURL = 'https://apps.apple.com/cn/app/%E9%A3%8E%E9%A3%8E%E5%AE%9D%E7%9B%92/id6752241244'
const appResourceURL = 'http://192.168.50.14:47000/ffbox1.0.0_20251104.apk'

let isShowAllUpdateInfo = false

detailMoreText.addEventListener('transitionend', e => {
    e.target.style.maxHeight = 'none'
});

; (function () {
    renderMetadata()
    renderUpdateInfo()
    renderIntroduction()
    renderComments()
})()

function renderMetadata() {
    const section1 = document.getElementById('section-1')
    if (section1) {
        section1.innerHTML = translateMetadata()
    }
}

function translateMetadata() {
    let res = '<ul>'

    res += metadata.map(value => {
        return `
            <li>
                <p class="title">${value.title}</p>
                <p class="content">${value.content}</p>
                <p class="bottom">${value.bottom}</p>
            </li>
        `
    }).join('')

    res += '</ul>'
    return res
}
// console.log(translateMetadata())

/**
 * In the DOM event module, events bubbles up from the target element
 * to its ancestors until they reach the document root -- unless stopped 
 * along the way.
 * 
 * Additional, If you want to know whether the click happened directly
 * on the parent or one of its children, you can check `event.target === event.currentTarget`.
 */
document.addEventListener('click', e => {
    if (e.target.id === 'detail-more-btn') {
        handleDetailMore(e.target)
    } else if (e.target.id === 'download-btn') {
        handleDownload(e.target)
    } else if (e.target.id === 'update-info') {
        handleUpdateInfo(e.target)
    }
})

document.getElementById('weixin-open-tip-img-container').addEventListener('touchmove', e => {
    e.preventDefault()
    e.stopPropagation()
})

document.getElementById('weixin-open-tip-img-container').addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
})

function handleDetailMore(element) {
    /**
     * This change will trigger the animation if it has been defined in CSS.
     */
    if (detailMoreText) {
        detailMoreText.style.height = `${detailMoreText.scrollHeight}px`
        element.classList.add('display-none')
    }
}

function handleDownload(element) {
    if (isBeingOpenedInsideWeChat()) {
        launchWeiXinOpenTip()
    } else {
        if (isIphone()) {
            // Redirect to the App store if it the page is opened in an iPhone.
            window.location.href = appStoreURL
        } else {
            // The webpage may be opened inside Alipay or other mobile browsers
            //
            // download a file when users click this button.
            const link = document.createElement('a')
            link.href = appResourceURL
            // link.download = 'some file name if neccessary'
            link.click()
        }
    }
}

function isBeingOpenedInsideWeChat() {
    return navigator.userAgent.toLowerCase().includes('micromessenger')
}
// isBeingOpenedInsideWeChat()

function isIphone() {
    // return /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase())
    return /iphone/.test(navigator.userAgent.toLowerCase())
}

function launchMsgBox(message) {
    if (message !== undefined) {
        msgBox.textContent = message
    }

    if (!msgBox.classList.contains('display-none')) {
        return
    }

    msgBox.classList.remove('display-none')
    setTimeout(() => {
        msgBox.classList.add('display-none')
    }, 1250)
}

function launchWeiXinOpenTip() {
    if (!weixinOpenTip.classList.contains('display-none')) {
        return
    }

    weixinOpenTip.classList.remove('display-none')
}

function handleUpdateInfo() {
    isShowAllUpdateInfo = !isShowAllUpdateInfo
    renderUpdateInfo()

    if (updateInfoTitle) {
        updateInfoTitle.classList.remove('after-style-1')
        updateInfoTitle.classList.remove('after-style-2')

        if (isShowAllUpdateInfo) {
            updateInfoTitle.classList.add('after-style-2')
        } else {
            updateInfoTitle.classList.add('after-style-1')
        }
    }
}

// 更新日志信息
function renderUpdateInfo() {
    if (updateInfoContainer) {
        updateInfoContainer.innerHTML = translateUpdateInfo()
    }
}

function translateUpdateInfo() {
    let htmlStr = '<ul>'
    let beRenderedUpdateInfo = updateInfo
    if (!isShowAllUpdateInfo) {
        beRenderedUpdateInfo = updateInfo.slice(0, 1)
    }

    htmlStr += beRenderedUpdateInfo.map(value => {
        return `
            <li>
                <div class="recent-update">
                    <p class="version">${value.version}</p>
                    <time datetime="${(new Date(value.time)).toLocaleDateString()}">${value.time}</time>
                </div>
                <p class="description">${value.description}</p>
            </li>
        `
    }).join('')
    htmlStr += '</ul>'
    return htmlStr
}
// console.log((new Date('2025-11-2')).toLocaleDateString())

// 新功能介绍内容
function renderIntroduction() {
    if (!section3) return

    if (introduction.trim() === '') {
        section3.innerHTML = ''
        return
    }

    if (!detailMoreText || !detailMoreBtn) return

    detailMoreText.textContent = introduction.trim()

    // If the scroll height exceeds the client height.
    if (detailMoreText.scrollHeight > detailMoreText.clientHeight) {
        detailMoreBtn.classList.remove('display-none')
    }
}

// 更新评论内容
function renderComments() {
    if (rateAvgContainer) {
        rateAvgContainer.innerHTML = translatecommentHeader()
    }
    if (commentCards) {
        commentCards.innerHTML = translateComments()
    }
}

function translatecommentHeader() {
    return `
        <p class="rate-avg">${comments.rateAvg}</p>
        <div>
            <p class="rate-avg-icon">${comments.rateAvgIcon}</p>
            <p class="rate-total">${comments.rateAmount}</p>
        </div>
    `
}

function translateComments() {
    return comments.comments.map(value => {
        return `
            <li class="card" id="card">
                <p class="title" id="card-title">${value.title}</p>
                <div class="meta-data">
                    <p class="rate">${value.rate}</p>
                    <time datetime="${(new Date(value.time)).toLocaleDateString()}">${value.time}</time>
                    <p class="commenter">${value.commenter}</p>
                </div>
                <p class="comment">${value.comment}</p>
            </li>
        `
    }).join('')
}

function handleOverflow() {
    const comments = document.getElementsByClassName('comment')
    const card = document.getElementById('card')

    if (!comments || !card) return

    for (let i = 0; i < comments.length; i++) {
        const comment = comments.item(i)
        let text = comment.textContent.trim()
        // The 100 mean: the card's padding-top + padding-bottom + title's height + title's 
        // margin-bottom + meta-data's height + margin-bottom = 100
        while (comment.scrollHeight > card.clientHeight - 100 && text.length > 0) {
            text = text.slice(0, -1).trim()
            comment.textContent = text + '...'
        }
    }
    // console.log(comment.scrollHeight, card.clientHeight - 100)
}

(function () {
    /**
     * How can I detect whether the text content inside a <p> tag  is overflowing?
     * 
     * You can detect it in JavaScript by comparing the element's scroll-height/width 
     * to its visible height/width(clientHeight/clientWidth)
     */

    // const comment = document.getElementById('comment')
    // console.log(comment.clientHeight, comment.clientWidth)

    // const defaultFontsize = getComputedStyle(document.documentElement).fontSize
    // console.log(defaultFontsize) // 16px

    handleOverflow()
})()