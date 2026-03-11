import { resolve } from 'node:path'

console.log(resolve('a', 'b', 'c', 'd')) // /working-directory/a/b/c/d
console.log(resolve('a', '/b', 'c', 'd')) // /b/c/d
console.log(resolve('a', 'b', '/c', 'd')) // /c/d
