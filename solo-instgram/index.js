const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

document.addEventListener('DOMContentLoaded', function () {
    // outHTML vs innerHTML

    // console.log('The document has loaded.');

    let sectionStr = ''
    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];

        sectionStr += `
        <section>
            <div class="container">
                <div class="info">
                    <img src="${element.avatar}" alt="An avatar of Vincent van Gogh">
                    <div>
                        <p class="name">${element.name}</p>
                        <address>${element.location}</address>
                    </div>
                </div>
                <img class="post-img" src="${element.post}" alt="avatar">
                <div class="response-icons">
                    <div class="outer">
                        <p id="like-heart-${i}">🤍</p>
                    </div>
                    <div class="outer">
                        <p id="message-bubble-${i}">💬</p>
                    </div>
                    <div class="outer">
                        <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer">
                            <img id="telegram-icon" class="telegram-icon" src="images/paper-airplane.png" alt="a telegram icon">
                        </a>
                    </div>
                </div>
                <p id="like-text-${i}" class="text accent-text">${element.likes} likes</p>
                <p class="text"> <span class="accent-text">${element.username}</span> ${element.comment}</p>
            </div>
        </section>`
    }

    const mainEl = document.getElementById('main')
    mainEl.innerHTML = sectionStr

    // 
    for (let i = 0; i < posts.length; i++) {
        const likeEl = document.getElementById(`like-heart-${i}`)
        likeEl.addEventListener('dblclick', function (ev) {
            const id = ev.target.id
            const idElements = id.split('-')
            const idTrailNumer = idElements[idElements.length - 1]

            const likeTextEl = document.getElementById(`like-text-${idTrailNumer}`)
            const content = likeTextEl.textContent
            const contentSplitedArr = content.split(' ')
            const likes = contentSplitedArr[0]

            likeTextEl.textContent = parseInt(likes) + 1 + ' ' + contentSplitedArr[1]
        })
        const bubbleEl = document.getElementById(`message-bubble-${i}`)
        bubbleEl.addEventListener('click', function () {
            console.log('clicked.')
        })
    }
});