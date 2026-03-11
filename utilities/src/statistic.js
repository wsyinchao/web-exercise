// import {} from 'lodash-es'
import {
    close,
    createReadStream,
    existsSync,
    mkdirSync,
    openSync,
    readdirSync,
    writeFileSync,
} from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createInterface } from 'node:readline'

const directoryPath = 'C:\\Users\\Administrator\\Desktop\\2026-03-09-login\\out'

// Check if the directory exists
if (!existsSync(directoryPath)) {
    console.error('Directory does not exists:', directoryPath)
    process.exit(1)
}

const files = await fs.readdir(directoryPath)
if (files.length === 0) {
    console.warn('The out directory is empty.\nPlease run filter.js first.')
    process.exit(1)
}

if (!existsSync(path.join(directoryPath, 'perUserid'))) {
    mkdirSync(path.join(directoryPath, 'perUserid'))
}

const contents = readdirSync(path.join(directoryPath, 'perUserid'))
if (contents.length > 0) {
    console.warn(
        'The perUserid directory is not empty.\nPlease clear the perUserid directory first.'
    )
    process.exit(1)
}

files.forEach(async (file) => {
    // A userid maps to a file descriptor
    const useridMaps2Fd = new Map()
    const filename = path.join(directoryPath, file)
    const state = await fs.stat(filename)
    if (state.isDirectory()) {
        return
    }

    // console.log(file)
    const outputDir = path.join(
        directoryPath,
        'perUserid',
        file.slice(0, file.lastIndexOf('.'))
    )
    // console.log(outputDir)
    // Create the output directory if neccssary
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir)
    }

    const filestream = createReadStream(filename)
    const rl = createInterface({ input: filestream, crlfDelay: Infinity })
    rl.on('line', (line) => {
        const [userid, sn] = line.split(',')
        // console.log(userid, sn)
        if (!useridMaps2Fd.has(userid)) {
            const outputDirPerUserId = path.join(outputDir, userid)
            const outputDirPerUserIdFd = openSync(outputDirPerUserId, 'w')
            useridMaps2Fd.set(userid, outputDirPerUserIdFd)
        }

        const fd = useridMaps2Fd.get(userid)
        writeFileSync(fd, sn + ',')
        // console.log(line)
    })

    rl.on('close', () => {
        console.log('Finished reading file.', filename)
        for (const fd of useridMaps2Fd.values()) {
            close(fd)
        }
    })
})
