import { blogs } from "/blogs.js";

// Because your script tag is located at the end of the document,
// so these line of code can always perform correctly.
const heroSection = document.getElementById('hero-section')

// No matter where you click (child or grandchild), the 
// event bubbles up to the parent.
document.addEventListener('click', e => {
    // stops bubbling up to parent
    // e.stopPropagation()

    // How can I check if an element is a child of another element in JavaScript?
    // The contains, closest methods and parentNode property.
    if (heroSection.contains(e.target)) {
        // Jump to post.html page
        location.href = '/post.html'
    }
})
