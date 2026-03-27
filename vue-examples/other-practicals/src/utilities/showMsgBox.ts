import Modal from '../components/Modal.vue'
import { createApp, h } from 'vue'

// About the syntax of the current file,
// you can refer to this document https://cn.vuejs.org/guide/extras/render-function.html

// It works.
export function showMsgBox(msg: string) {
    const modalEle = document.createElement('div')
    document.body.appendChild(modalEle)

    const app = createApp({
        render() {
            return h(
                Modal,
                {
                    show: true,
                    onClose: () => {
                        app.unmount()
                        document.body.removeChild(modalEle)
                    },
                },
                {
                    main: () => msg,
                },
            )
        },
    })

    app.mount(modalEle)
}
