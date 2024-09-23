let currentSection = 0;
const sections = document.querySelectorAll('.introP2');

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        // Scroll down
        if (currentSection < sections.length - 1) {
            sections[currentSection].classList.add('scroll-active');
            currentSection++;
        }
    } else {
        // Scroll up
        if (currentSection > 0) {
            currentSection--;
            sections[currentSection].classList.remove('scroll-active');
        }
    }
});
