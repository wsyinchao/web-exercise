import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'

const directoryPath = 'C:\\Users\\Administrator\\Desktop\\2026-03-09-login'
// Check if the directory exists
if (!fs.existsSync(directoryPath)) {
    console.error('Directory does not exist:', directoryPath)
    process.exit(1)
}

// Check if need to create output directory
const outputDir = path.join(directoryPath, 'out')
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
}

// Check if the output directory is empty
if (fs.readdirSync(outputDir).length > 0) {
    console.warn(
        'The out directory is not empty.\nPlease clear the output directory before running the script.'
    )
    process.exit(1)
}

function listFilesRecursively(dir) {
    let results = []
    const list = fs.readdirSync(dir)
    list.forEach((file) => {
        file = path.join(dir, file)
        const stat = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            results = results.concat(listFilesRecursively(file))
        } else {
            results.push(file)
        }
    })
    return results
}

const files = listFilesRecursively(directoryPath)
// console.log(files)

function readFileLineByLine(filePath) {
    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const outputFile = fs.openSync(
        path.join(
            directoryPath,
            'out',
            path.basename(filePath) + filePath.split('\\')[5] + '.out'
        ),
        'w'
    )

    rl.on('line', (line) => {
        if (line.includes(', sn=')) {
            const originalData = line.split(']').pop().split(',')
            // console.log(originalData)
            const item = [
                originalData[0].split('=').pop(),
                originalData[1].split('=').pop(),
            ]
            // console.log(item)

            // Here must be writeFileSync instead of write, otherwise
            // the order of the output file will be messed up, because write is asynchronous.
            fs.writeFileSync(outputFile, item.join(',') + '\n')

            // This will cause the output file to be messed up, because write is asynchronous.
            // fs.write(
            //     outputFile,
            //     item.join(',') + '\n',
            //     (err, writtern, str) => {
            //         if (err) {
            //             console.log('Something went wrong.')
            //         }
            //     }
            // )
        }
    })

    rl.on('close', () => {
        console.log('Finished reading file.', filePath)
        fs.close(outputFile, (err) => {
            if (err) {
                console.error('Error closing file:', err)
            }
        })
    })
}

files.forEach((filename) => {
    readFileLineByLine(filename)
})
