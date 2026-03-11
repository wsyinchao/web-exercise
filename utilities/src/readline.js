import { createInterface } from 'node:readline'
import { createReadStream } from 'node:fs'
import path from 'node:path'

const rl = createInterface({
    input: createReadStream(path.resolve('src', 'readline.js')),
    crlfDelay: Infinity,
})

for await (const line of rl) {
    console.log(line)
}
