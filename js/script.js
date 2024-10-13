document.addEventListener("DOMContentLoaded", () => {
    const galleryButtons = document.querySelectorAll('.gallery .button');
    const gallerySlides = document.querySelectorAll('.gallery .slide_div');
    const imgContainer = document.querySelector('.gallery .imgContainer');

    let currentIndex = 0;
    const totalSlides = gallerySlides.length;

    const isMobile = window.innerWidth <= 768;
    const isIOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/i);

    const handleImageInteraction = (index) => {
        if (isMobile) {
            imgContainer.scrollLeft = gallerySlides[index].offsetLeft - 10;
        } else {
            if (gallerySlides[index].classList.contains('enlarge')) {
                gallerySlides[index].classList.remove('enlarge');
                imgContainer.style.transform = `translateX(${currentIndex * -240}px)`;
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

    galleryButtons.forEach((button, index) => {
        button.addEventListener('click', () => handleImageInteraction(index));
        button.addEventListener('touchstart', () => handleImageInteraction(index), { passive: false });
    });

    imgContainer.addEventListener('scroll', () => {
        if (isMobile) {
            const maxScrollLeft = imgContainer.scrollWidth - imgContainer.clientWidth;
            if (Math.abs(imgContainer.scrollLeft - maxScrollLeft) <= 10) {
                setTimeout(() => {
                    imgContainer.scrollLeft = 0;
                }, 1000);
            }
        }
    });

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

    const menuBar = document.getElementById('menu-bar');
    const navbar = document.querySelector('.navbar');
    menuBar.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });

    const navbarLinks = document.querySelectorAll('.gallery-nav a');
    navbarLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY || window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                navbarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    function fadeOutLoader() {
        const loaderContainer = document.querySelector('.loader-container');
        loaderContainer.classList.add('fade-out');
    }

    function init() {
        setTimeout(fadeOutLoader, 3000);
    }

    window.onload = init;

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

        const allGradeDetails = document.querySelectorAll('.grade-details');
        allGradeDetails.forEach(detail => {
            if (detail.id !== targetId) {
                detail.classList.remove('active');
            }
        });

        if (targetElement) {
            targetElement.classList.toggle('active');
        } else {
            console.error(`No element found with ID: ${targetId}`);
        }
    });
});
