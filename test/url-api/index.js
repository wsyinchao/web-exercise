const url1 = new URL('https://google.com')
console.log(url1)

const data = [
    {
        name: 'yinchao',
        age: 31,
    },
    {
        name: 'yc',
        age: 28,
    },
]

const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'})
const url2 = URL.createObjectURL(blob)
console.log(url2)

URL.revokeObjectURL(url2)

// download data as a file
function download(data) {
    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.txt'
    a.click()
    URL.revokeObjectURL(url)
}

download(data)