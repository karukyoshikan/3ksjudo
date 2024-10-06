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

    // Form validation and submission
    const form = document.getElementById('subscribe-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Subscription successful!");
                event.target.reset();
            } else {
                alert("Failed to subscribe. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
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
});
