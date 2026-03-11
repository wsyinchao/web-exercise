import { existsSync, createReadStream, openSync } from 'node:fs'
import { readdir, readFile, stat } from 'node:fs/promises'
import pathLib from 'node:path'
import readline from 'node:readline'

const directoryPath =
    'C:\\Users\\Administrator\\Desktop\\2026-03-09-login\\out\\perUserid'
if (!existsSync(directoryPath)) {
    console.error('Directory does not exist:', directoryPath)
    process.exit(1)
}

async function readAllFiles(path) {
    let results = []
    const files = await readdir(path)

    for (const file of files) {
        const state = await stat(pathLib.join(path, file))
        if (state.isDirectory()) {
            results = results.concat(
                await readAllFiles(pathLib.join(path, file))
            )
        } else {
            results.push(pathLib.join(path, file))
        }
    }

    return results
}

const files = await readAllFiles(directoryPath)

for (const file of files) {
    const content = await readFile(file, 'utf-8')
    let contentsArray = content.split(',')
    contentsArray = contentsArray.map((value) => parseInt(value))
    // console.log(contentsArray.slice(3210))
    contentsArray.pop()
    // process.exit(1)

    let counts = 10
    contentsArray.reduce((previousValue, currentValue, index) => {
        // if (!(counts--)) {
        //     process.exit(1)
        // }
        // console.log(previousValue, currentValue)

        if (currentValue === 0) {
            previousValue = 0
        } else {
            previousValue++
        }

        if (currentValue !== previousValue) {
            console.warn(
                'File is not continuous:',
                file,
                previousValue,
                currentValue,
                index
            )
            process.exit(1)
        }

        return currentValue
    })

    console.log('File is continuous:', file)
}

console.log(
    'Checking finished.\nAll files are continuous.\nChecked',
    files.length,
    'files in total.'
)
