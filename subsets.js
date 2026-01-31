var subsets = function (nums) {
    const subsets = []
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
        subsets.push(subset)
    }

    return subsets
};

console.log(subsets([1, 2, 3, 4]))
