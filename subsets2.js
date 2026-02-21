var subsetsWithDup = function (nums) {
    const subsets = []
    const map = new Map()
    const n = nums.length
    const end = (1 << n) - 1;
    // console.log(end, end.toString(2))
    for (let i = 0; i <= end; i++) {
        const subset = []
        // Each bit position coresponds to an index in the array.
        // Each bit position maps to one element index in nums.
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subset.push(nums[j])
            }
        }
        const key = [...subset.toSorted((a, b) => a - b).values()].toString()
        if (!map.has(key)) {
            subsets.push(subset)
            map.set(key, 1)
        }
    }

    // return Array.from(subsets)
    return subsets
};

console.log(subsetsWithDup([1, 2, 2, 2]))