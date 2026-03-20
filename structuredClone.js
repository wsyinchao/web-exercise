const obj = { name: 'yinchao' }
obj.itself = obj

const cloneObj = structuredClone(obj)

console.log(cloneObj) // { name: 'yinchao', itself: [Circular] }
console.log(cloneObj === obj) // false
console.log(cloneObj.itself === cloneObj) // true

// My own implementation of structuredClone
function myStructuredClone(obj, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    if (map.has(obj)) {
        return map.get(obj)
    }

    const clone = Array.isArray(obj) ? [] : {}
    map.set(obj, clone)

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = myStructuredClone(obj[key], map)
        }
    }

    return clone
}

const myCloneObj = myStructuredClone(obj)

console.log(myCloneObj) // { name: 'yinchao', itself: [Circular] }
console.log(myCloneObj === obj) // false
console.log(myCloneObj.itself === myCloneObj) // true
