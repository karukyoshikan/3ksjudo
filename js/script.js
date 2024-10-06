document.addEventListener("DOMContentLoaded", () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('.lazy');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                image.classList.remove('lazy');
                observer.unobserve(image);
            }
        });
    }, options);

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Scroll to top functionality
    const scrollTopBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Toggle menu
    const menuBar = document.getElementById('menu-bar');
    const navbar = document.querySelector('.navbar');
    menuBar.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Close menu after link click
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });

   
    
    // Loader fade out
    function fadeOutLoader() {
        const loaderContainer = document.querySelector('.loader-container');
        loaderContainer.classList.add('fade-out');
    }

    function init() {
        setTimeout(fadeOutLoader, 3000);
    }

    window.onload = init;

    // Handle "Learn More" button clicks in Grades section
    const gradeButtons = document.querySelectorAll('.grade-box .btn');
    gradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            // Close all other grade details
            const allGradeDetails = document.querySelectorAll('.grade-details');
            allGradeDetails.forEach(detail => {
                if (detail.id !== targetId) {
                    detail.classList.remove('active');
                }
            });

            // Toggle the clicked grade details
            if (targetElement) {
                targetElement.classList.toggle('active');
                console.log(`Toggled visibility for: ${targetId}`);
            } else {
                console.error(`No element found with ID: ${targetId}`);
            }
        });
    });
    const time = () => {

        const activerow = document.querySelector('#activerow');

        const monday = document.querySelector('.monday');
        const tuesday = document.querySelector('.tuesday');
        const wednesday = document.querySelector('.wednesday');
        const thursday = document.querySelector('.thursday');
        const friday = document.querySelector('.friday');
        const saturday = document.querySelector('.saturday');
        const sunday = document.querySelector('.sunday');


        switch (new Date().getDay()) {

            case 1:
                monday.setAttribute("id", "activerow");
                break;
            case 2:
                tuesday.setAttribute("id", "activerow");
                break;
            case 3:
                wednesday.setAttribute("id", "activerow");
                break;
            case 4:
                thursday.setAttribute("id", "activerow");
                break;
            case 5:
                friday.setAttribute("id", "activerow");
                break;
            case 6:
                saturday.setAttribute("id", "activerow");
                break;
            case 0:
                sunday.setAttribute("id", "activerow");
                break;
        }

    }
    time();
});
