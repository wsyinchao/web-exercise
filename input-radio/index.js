const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    // console.log('Form data:', Object.fromEntries(formData.entries()));
    const selectedOption = formData.get('contact');
    console.log('Selected option:', selectedOption);
});