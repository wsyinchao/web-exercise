import { tweetsData as td } from "./data.js"

let tweetsData = td

document.addEventListener('DOMContentLoaded', () => {
    // console.log('Dom has loaded')
    const localData = JSON.parse(localStorage.getItem('tweetsData'))
    if (localData) {
        tweetsData = localData
    }
    // console.log(tweetsData)
    render()
})

document.addEventListener('click', event => {
    // console.log(event.target.dataset)
    if (event.target.dataset.heart) {
        handleClickHeart(event.target.dataset.heart)
        saveData()
    }
    else if (event.target.dataset.retweet) {
        handleClickRetweet(event.target.dataset.retweet)
        saveData()
    }
    else if (event.target.dataset.reply) {
        handleClickReply(event.target.dataset.reply)
    }
    else if (event.target.id === 'tweet-btn') {
        handleClickTweetBtn()
        saveData()
    }
})

function saveData() {
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
}

function handleClickHeart(uuid) {
    const targetTweet = tweetsData.find(tweet => tweet.uuid === uuid)
    if (targetTweet.isLiked) {
        targetTweet.likes--
    } else {
        targetTweet.likes++
    }

    targetTweet.isLiked = !targetTweet.isLiked

    render()
}

function handleClickRetweet(uuid) {
    const targetTweet = tweetsData.find(tweet => tweet.uuid === uuid)
    if (targetTweet.isRetweeted) {
        targetTweet.retweets--
    } else {
        targetTweet.retweets++
    }

    targetTweet.isRetweeted = !targetTweet.isRetweeted

    render()
}

function handleClickReply(uuid) {
    const replies = document.getElementById(`replies-${uuid}`)
    replies.classList.toggle('hidden')
    // render()
}

function handleClickTweetBtn() {
    const inputArea = document.getElementById('input-area')
    if (!inputArea.value) return

    tweetsData.unshift({
        handle: '@yinchao',
        profilePic: './images/scrimbalogo.png',
        likes: 0,
        retweets: 0,
        tweetText: inputArea.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: crypto.randomUUID()
    })

    inputArea.value = ''

    render()
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHTML()
}

function getFeedHTML() {
    let feedHTML = ''
    tweetsData.forEach(tweet => {
        let likeIconClass = ''
        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }
        let retweetIconClass = ''
        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        let repliesHTML = ''
        if (tweet.replies.length > 0) {
            tweet.replies.forEach(reply => {
                repliesHTML += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `
            })
        }

        feedHTML += `
            <div class="tweet container">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" alt="profile picture">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detial">
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detial">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-heart="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detial">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${repliesHTML}
                </div>
            </div>
        `
    })
    return feedHTML
}

// render()
