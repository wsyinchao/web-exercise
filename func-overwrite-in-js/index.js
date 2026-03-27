import { overwriteFunc } from './utility.js'

const overwrite = overwriteFunc()

try {
    overwrite('Alice') // Error: No function found for the given arguments
} catch (error) {
    console.error(error.message)
    // console.log(error)
    // console.log(error.cause)
    // console.log(error.name) // Error
    // console.log(typeof error) // object

    // There are four none-standard properties that are commonly used in error objects.
    // console.log(error.stack)
    // console.log(error.lineNumber)
    // console.log(error.columnNumber)
    // console.log(error.filename)
}

overwrite.addImpl('string', function (name) {
    return `Hello, ${name}!`
})

overwrite.addImpl('string', 'number', function (name, age) {
    return `Hi, ${name}! You are ${age}.`
})

console.log(overwrite('Alice')) // Output: Hello, Alice!

console.log(overwrite('Alice', 31)) // Output: Hi, Alice! You are 31.
