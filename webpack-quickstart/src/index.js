import _ from "lodash"

function component() {
    const element = document.createElement('h1')

    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    return element
}

document.body.appendChild(component());

(function () {
    const { dirname, filename, url, main } = import.meta
    /**
     * undefined, undefined, 'file:///D:/workspace/personal-website/webpack-quickstart/src/index.js', undefined.
     */
    console.log(dirname, filename, url, main)
})()