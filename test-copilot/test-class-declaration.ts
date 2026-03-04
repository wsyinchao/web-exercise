class ArrayWrapper {
    data: number[];

    constructor(nums: number[]) {
        this.data = nums;
    }
    
    valueOf(): number {
        return this.data.reduce((acc, num) => acc + num, 0);
    }
    
    toString(): string {
        return JSON.stringify(this.data);
    }
};

/**
 * const obj1 = new ArrayWrapper([1,2]);
 * const obj2 = new ArrayWrapper([3,4]);
 * obj1 + obj2; // 10
 * String(obj1); // "[1,2]"
 * String(obj2); // "[3,4]"
 */