/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    const max = Math.max(...nums)
    const binaryLength = max.toString(2).length
    // The value of `binaryLength` must less than 32 in JavaScript.
    const size = 1 << binaryLength
    const full = size - 1

    // const maskArr = Array.from({ length: size }).fill(-1)
    const maskArr = new Int32Array(size).fill(-1)
    for (const n of nums) {
        maskArr[n] = n
    }

    // SOS DP: maskArr[mask] becomes max value whose bitmask is a subset of mask.
    for (let i = 0; i < binaryLength; i++) {
        const bit = 1 << i
        for (let mask = 1; mask < size; mask++) {
            if (bit & mask) {
                const subset = mask ^ bit
                if (maskArr[subset] > maskArr[mask]) {
                    maskArr[mask] = maskArr[subset]
                }
            }
        }
    }

    let res = 0
    for (const n of nums) {
        const complement = full ^ n
        const n2 = maskArr[complement]
        if (n2 !== -1) {
            res = Math.max(res, n * n2)
        }
    }

    return res
};

console.log(maxProduct([1, 2, 3, 4, 5, 6, 7]))