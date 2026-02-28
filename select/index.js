const select = document.getElementById('test-select');
const button = document.getElementById('test-button');

button.addEventListener('click', () => {
    const outputMessage = select.value ? select.value : 'No option selected';

    console.log(outputMessage);
})
