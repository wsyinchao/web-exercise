// let crypto

// try {
//     crypto = await import('crypto')
// } catch (error) {
//     console.log('crypto unavailable')
// }

// const array = new Uint8Array(10)
// console.log(crypto.getRandomValues(array))
// console.log(array)

let http2

try {
    http2 = await import('http2')
} catch (error) {
    console.log('http2 support is unsupported')
    process.exit(1)
}

console.log(http2)
