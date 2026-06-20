/**
 * 终端里有两个不同的控制字符：
 * \n（line feed，换行）：光标移到下一行
 * \r（carriage return，回车）：光标移到当前行的最开头，但不换行
 */

let count = 0
const progressFunc = () => {
    process.stdout.write(`\r Terminal Progress bar: ${count++}%`)

    if (count <= 100) {
        setTimeout(() => {
            progressFunc()
        }, 100)
    }
}

progressFunc()
