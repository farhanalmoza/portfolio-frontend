/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== EXPERIENCES MODAL ===============*/
const modalViews = document.querySelectorAll('.experiences__modal'),
      modalBtns = document.querySelectorAll('.experiences__button'),
      modalClose = document.querySelectorAll('.experiences__modal-close');

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i);
    })
})

modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active-modal');
        })
    })
})

/*=============== RENDER WORKS ===============*/
const workContainer = document.getElementById('work-container');

workContainer.innerHTML = worksData.map((work) => `
    <div class="work__card mix ${work.category}">
        <img src="${work.image}" alt="${work.title} project screenshot" class="work__img">
        <h3 class="work__title">${work.title}</h3>

        <div class="work__link">
            ${work.demoUrl ? `
            <a href="${work.demoUrl}" class="work__button wb__demo" target="_blank">
                Demo <i class="bx bx-right-arrow-alt .work__icon"></i>
            </a>` : ''}
            <a href="${work.githubUrl}" class="work__button wb__github" target="_blank">
                Github <i class="bx bx-right-arrow-alt .work__icon"></i>
            </a>
        </div>
    </div>
`).join('');

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 400
    }
});

/* Link active work */ 
const linkWork = document.querySelectorAll('.work__item');

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'));
    this.classList.add('active-work');
}

linkWork.forEach(l => l.addEventListener('click', activeWork));

/*=============== SWIPER TESTIMONIAL ===============*/


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
              sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}
window.addEventListener('scroll', scrollActive);

/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true,
})

sr.reveal(`.home__data`)
sr.reveal(`.home__handle`, {delay: 700})
sr.reveal(`.home__social, .home__scroll`, {delay: 900, origin: 'bottom'})

/*=============== FOOTER YEAR ===============*/
document.getElementById('footer-year').textContent = new Date().getFullYear();

/*=============== CONTACT FORM (EMAILJS) ===============*/
// Replace these with your own EmailJS credentials from https://dashboard.emailjs.com/
const EMAILJS_PUBLIC_KEY = 'T1Y7x0WXTinmzmdIi';
const EMAILJS_SERVICE_ID = 'service_7waz4z8';
const EMAILJS_TEMPLATE_ID = 'template_d2memv4';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const contactForm = document.getElementById('contact-form');
const contactFormStatus = document.getElementById('contact-form-status');
const contactFormButton = contactForm.querySelector('button[type="submit"]');
const contactFormButtonDefaultText = contactFormButton.textContent;

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    contactFormButton.disabled = true;
    contactFormButton.textContent = 'Sending...';
    contactFormStatus.className = 'contact__form-status';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
            contactFormStatus.textContent = 'Message sent successfully!';
            contactFormStatus.className = 'contact__form-status contact__form-status--success';
            contactForm.reset();
        })
        .catch(() => {
            contactFormStatus.textContent = 'Something went wrong. Please try again or email me directly.';
            contactFormStatus.className = 'contact__form-status contact__form-status--error';
        })
        .finally(() => {
            contactFormButton.disabled = false;
            contactFormButton.textContent = contactFormButtonDefaultText;
        });
});
