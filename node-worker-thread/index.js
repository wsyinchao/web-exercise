import {
    Worker,
    isMainThread,
    parentPort,
    workerData,
    threadId,
} from 'node:worker_threads'

if (isMainThread) {
    // The first parameter is the path to the worker file to run,
    // currently is the same file, but you can also create a separate file for the worker thread.
    const worker = new Worker(new URL(import.meta.url), {
        workerData: {
            name: 'worker',
        },
    })

    worker.on('message', (message) => {
        console.log(message)
    })

    worker.on('exit', (code) => {
        console.log(`Worker stopped with exit code ${code}`)
    })

    console.log('Here is the bottom line of the main thread')
} else {
    // worker thread
    console.log(workerData.name)
    parentPort.postMessage(`Hello from worker thread: id -> ${threadId}`)
    process.exit(0)
}
