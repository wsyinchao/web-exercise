import http from "node:http"

const PORT = 8008

const server = http.createServer((req, res) => {
    // res.statusCode = 404 // How do you specify the status code
    // res.setHeader('Content-type', 'application/json') // How do you specify the response header.
    // res.writeHead(404, 'Not found')  // 
    res.setHeader('x-custom-head', 'my value')
    res.setHeader('X-Custom-Head-2', 'my value 2') // The header's name is case-sensitive.
    res.write('Some data written by res.write method')
    res.end('Hello from the server side')
})

server.listen(PORT, 'localhost', () => {
    console.log(`Server has listened on localhost:${PORT}`)
})

// const socket = new WebSocket('wss://localhost')
// socket.send(data) // sent any content to a client without initial request
