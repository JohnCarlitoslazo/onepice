document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');

    
    const showNavbarAndHeader = () => {
        navbar.style.transform = 'translateY(0)';
        header.style.transform = 'translateY(0)';
    };

    
    const hideNavbarAndHeader = () => {
        navbar.style.transform = 'translateY(-100%)';
        header.style.transform = 'translateY(-100%)';
    };

    let scrollingTimeout = null;

    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            
            hideNavbarAndHeader();

            
            if (scrollingTimeout !== null) {
                clearTimeout(scrollingTimeout);
            }
        } else {
            
            showNavbarAndHeader();

            
            scrollingTimeout = setTimeout(() => {
                hideNavbarAndHeader();
            }, 250); 
        }

        lastScrollTop = scrollTop;
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const fixedHeaderHeight = header.offsetHeight;
                const offsetTop = target.offsetTop - fixedHeaderHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    document.addEventListener('mousemove', (event) => {
        if (event.clientY <= 50) {
            showNavbarAndHeader();
        } else if (event.clientY > header.offsetHeight) {
            hideNavbarAndHeader();
        }
    });
});