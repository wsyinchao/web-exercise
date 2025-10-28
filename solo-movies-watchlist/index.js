// const api = 'http://www.omdbapi.com/?i=tt3896198&apikey=ea980577'
const api = 'http://www.omdbapi.com/?apikey=ea980577';

function truncateText(element, maxLength) {
    const text = element.textContent
    if (text.length >= maxLength) {
        element.textContent = text.substring(0, maxLength) + '...'
    }
}

truncateText(document.getElementById('plot-truncate-text'), 326)