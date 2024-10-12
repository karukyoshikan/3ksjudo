document.addEventListener("DOMContentLoaded", () => {
    const galleryButtons = document.querySelectorAll('.gallery .button'); // Select all gallery buttons
    const gallerySlides = document.querySelectorAll('.gallery .slide_div'); // Select all gallery image containers
    const imgContainer = document.querySelector('.gallery .imgContainer'); // Select the container that holds all images

    let currentIndex = 0; // Track the current index of the focused image
    const totalSlides = gallerySlides.length; // Get the total number of slides

    // Determine if the device is mobile or desktop
    const isMobile = window.innerWidth <= 768;

    // Function to handle image interaction (enlarge or view mode)
    const handleImageInteraction = (index) => {
        if (isMobile) {
            imgContainer.scrollLeft = gallerySlides[index].offsetLeft - 10; // Scroll to the selected image
        } else {
            if (gallerySlides[index].classList.contains('enlarge')) {
                gallerySlides[index].classList.remove('enlarge');
                imgContainer.style.transform = `translateX(${currentIndex * -240}px)`; // Reset to the current position
                return;
            }
            gallerySlides.forEach(slide => slide.classList.remove('enlarge'));
            gallerySlides[index].classList.add('enlarge');
            currentIndex = index;

            let translateValue = -currentIndex * 240;
            const maxTranslateValue = -(totalSlides - 1) * 240;
            if (translateValue < maxTranslateValue) {
                translateValue = maxTranslateValue;
            }

            imgContainer.style.transform = `translateX(${translateValue}px)`;

            // Desktop: Auto reset to the first image when last is clicked
            if (currentIndex === totalSlides - 1) {
                setTimeout(() => {
                    imgContainer.style.transition = 'none';
                    imgContainer.style.transform = 'translateX(0px)';
                    gallerySlides.forEach(slide => slide.classList.remove('enlarge'));
                    gallerySlides[0].classList.add('enlarge');
                    currentIndex = 0;

                    setTimeout(() => {
                        imgContainer.style.transition = 'transform 0.7s ease-in-out';
                    }, 50);
                }, 2000);
            }
        }
    };

    // Apply event listeners for click and touch events
    galleryButtons.forEach((button, index) => {
        button.addEventListener('click', () => handleImageInteraction(index));
        button.addEventListener('touchstart', () => handleImageInteraction(index));
    });

    // Add horizontal scroll event listener for mobile
    imgContainer.addEventListener('scroll', () => {
        if (isMobile) {
            // Check if the user has scrolled to the last image
            const maxScrollLeft = imgContainer.scrollWidth - imgContainer.clientWidth;
            if (Math.abs(imgContainer.scrollLeft - maxScrollLeft) <= 10) {
                setTimeout(() => {
                    imgContainer.scrollLeft = 0; // Scroll back to the first image
                }, 1000); // Add a short delay before resetting
            }
        }
    });

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

    // Navbar smooth scrolling to sections
    const navbarLinks = document.querySelectorAll('.gallery-nav a'); // Select all navbar links
    navbarLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Get target section ID
            const targetElement = document.getElementById(targetId);

            // Smooth scroll to the section
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Highlight active section in navbar based on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY || window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                navbarLinks.forEach(link => {
                    link.classList.remove('active'); // Remove 'active' class from all links
                    if (link.getAttribute('href').substring(1) === currentId) {
                        link.classList.add('active'); // Add 'active' class to the current link
                    }
                });
            }
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

    // Time-based active row highlight
    const time = () => {
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
    };
    time();
});

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
