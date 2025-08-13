let homeScore = 0
let guestScore = 0

const homeScoreEl = document.getElementById('home-score')
const guestScoreEl = document.getElementById('guest-score')

function addHomeScore(score) {
    homeScore += score
    homeScoreEl.textContent = homeScore
}

function addGuestScore(score) {
    guestScore += score
    guestScoreEl.textContent = guestScore
}

function reset() {
    homeScore = 0
    guestScore = 0
    homeScoreEl.textContent = homeScore
    guestScoreEl.textContent = guestScore
}