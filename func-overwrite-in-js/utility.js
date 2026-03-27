export function overwriteFunc() {
    const map = new Map()

    function overwrite(...args) {
        const key = args.map((arg) => typeof arg).join(',')
        if (map.has(key)) {
            return map.get(key).apply(this, args)
        } else {
            throw new Error('No function found for the given arguments')
        }
    }

    overwrite.addImpl = function (...args) {
        const fn = args.pop()
        if (typeof fn !== 'function') {
            throw new Error('The last argument must be a function')
        }
        const key = args.join(',')
        map.set(key, fn)
    }

    return overwrite
}
