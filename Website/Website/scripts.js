// Import functions from scripts.js
import { initSmoothScrolling, initModal } from './scripts.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling and modal functionality
    initSmoothScrolling();
    initModal();

    // Additional setup not covered by init functions
    const navLinks = document.querySelectorAll('nav ul li a');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-modal');
    const firstModalFocusableElement = modal.querySelector('button');

    // Setup navigation link interactions
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const destination = document.querySelector(this.getAttribute('href'));
            if (destination) {
                destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            closeModal(); // Assuming closeModal is properly handling modal closure
        });
    });

    // Assuming closeModal function is defined within initModal or here if needed
    function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        const triggerElement = document.activeElement; // Ensures focus management
        if (triggerElement && triggerElement.tagName === 'A') {
            triggerElement.focus();
        }
    }

    // Assuming the function openModal is also defined either here or within initModal
    function openModal() {
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        firstModalFocusableElement.focus();
    }

    // Handle modal interactions
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    closeModalButton.addEventListener('click', () => {
        closeModal();
    });
});
