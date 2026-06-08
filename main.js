// =========================================
// ALVEERA AHMAD — PORTFOLIO SCRIPT
// =========================================

// LOADER
window.addEventListener('load', () => {
	const loader = document.getElementById('loader');
	const loaderLine = document.querySelector('.loader-line');
	if (loaderLine) loaderLine.style.width = '100%';
	setTimeout(() => {
		if (loader) loader.classList.add('hidden');
	}, 1400);
});
// Failsafe: also kick off loader-line on initial parse
setTimeout(() => {
	const line = document.querySelector('.loader-line');
	if (line) line.style.width = '100%';
}, 100);

// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

if (cursor && trail && window.innerWidth > 968) {
	document.addEventListener('mousemove', (e) => {
		mx = e.clientX;
		my = e.clientY;
		cursor.style.transform = `translate(${mx}px, ${my}px)`;
	});

	function animateTrail() {
		tx += (mx - tx) * 0.15;
		ty += (my - ty) * 0.15;
		trail.style.transform = `translate(${tx}px, ${ty}px)`;
		requestAnimationFrame(animateTrail);
	}
	animateTrail();

	document.querySelectorAll('[data-hover]').forEach(el => {
		el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
		el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
	});
}

// WORK PREVIEW IMAGE FOLLOWING CURSOR
const preview = document.getElementById('work-preview');
const previewImg = document.getElementById('work-preview-img');

if (preview && previewImg) {
	document.querySelectorAll('.work__card').forEach(item => {
		const img = item.getAttribute('data-img');
		if (!img) return;
		item.addEventListener('mouseenter', () => {
			previewImg.src = img;
			preview.classList.add('active');
		});
		item.addEventListener('mouseleave', () => {
			preview.classList.remove('active');
		});
		item.addEventListener('mousemove', (e) => {
			preview.style.left = e.clientX + 'px';
			preview.style.top = e.clientY + 'px';
		});
	});
}

// CONTACT FORM — mailto (original behavior preserved)
const sendMailBtn = document.getElementById('sendMail');
if (sendMailBtn) {
	sendMailBtn.addEventListener('click', function (e) {
		// only build mailto if valid; actual form submit handled below
	});
}

// MENU SHOW (mobile)
const showMenu = (toggleId, navId) => {
	const toggle = document.getElementById(toggleId),
		nav = document.getElementById(navId);

	if (toggle && nav) {
		toggle.addEventListener('click', () => {
			nav.classList.toggle('show');
		});
	}
};
showMenu('nav-toggle', 'nav-menu');

// REMOVE MENU MOBILE on link click
const navLink = document.querySelectorAll('.nav__link');
function linkAction() {
	const navMenu = document.getElementById('nav-menu');
	if (navMenu) navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// ACTIVE LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__menu a');

const scrollActive = () => {
	let scrollY = window.scrollY;
	sections.forEach(current => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 80;
		const sectionId = current.getAttribute('id');
		const sectionLink = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);

		if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
			navLinks.forEach(link => link.classList.remove('active-link'));
			if (sectionLink) sectionLink.classList.add('active-link');
		}
	});
};
window.addEventListener('scroll', scrollActive);
document.addEventListener('DOMContentLoaded', scrollActive);

// SCROLL REVEAL
if (typeof ScrollReveal !== 'undefined') {
	const sr = ScrollReveal({
		origin: 'bottom',
		distance: '40px',
		duration: 1100,
		delay: 100,
		easing: 'cubic-bezier(0.7, 0, 0.3, 1)',
		reset: false
	});

	sr.reveal('.home__data', { delay: 200 });
	sr.reveal('.home__bottom', { delay: 400 });
	sr.reveal('.section__header', {});
	sr.reveal('.about__img', { origin: 'left', distance: '60px' });
	sr.reveal('.about__subtitle, .about__text, .about__detail', { delay: 200, interval: 100 });
	sr.reveal('.skills__text', {});
	sr.reveal('.skills__data', { interval: 80 });
	sr.reveal('.work__card', { interval: 150 });
	sr.reveal('.philosophy-quote, .philosophy-attr', { delay: 200 });
	sr.reveal('.contact__cta', {});
	sr.reveal('.contact__info, .contact__form', { delay: 200, interval: 100 });
	sr.reveal('.footer__big', {});
}

// ANIMATE SKILL BARS WHEN VISIBLE
const skillObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('skill-visible');
		}
	});
}, { threshold: 0.3 });
document.querySelectorAll('.skills__data').forEach(el => skillObserver.observe(el));

// CONTACT FORM VALIDATION (original logic kept intact)
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const successMessage = document.getElementById('success-message');
const submitButton = document.getElementById('sendMail');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (nameInput) {
	nameInput.addEventListener('input', () => {
		if (nameInput.value.trim() === '') {
			nameInput.classList.add('error');
			nameError.classList.add('show');
		} else {
			nameInput.classList.remove('error');
			nameError.classList.remove('show');
		}
	});
}

if (emailInput) {
	emailInput.addEventListener('input', () => {
		if (!emailRegex.test(emailInput.value)) {
			emailInput.classList.add('error');
			emailError.classList.add('show');
		} else {
			emailInput.classList.remove('error');
			emailError.classList.remove('show');
		}
	});
}

if (messageInput) {
	messageInput.addEventListener('input', () => {
		if (messageInput.value.trim() === '') {
			messageInput.classList.add('error');
			messageError.classList.add('show');
		} else {
			messageInput.classList.remove('error');
			messageError.classList.remove('show');
		}
	});
}

if (contactForm) {
	contactForm.addEventListener('submit', (e) => {
		e.preventDefault();

		let isValid = true;

		if (nameInput.value.trim() === '') {
			nameInput.classList.add('error');
			nameError.classList.add('show');
			isValid = false;
		}

		if (!emailRegex.test(emailInput.value)) {
			emailInput.classList.add('error');
			emailError.classList.add('show');
			isValid = false;
		}

		if (messageInput.value.trim() === '') {
			messageInput.classList.add('error');
			messageError.classList.add('show');
			isValid = false;
		}

		if (isValid) {
			submitButton.disabled = true;
			const btnSpan = submitButton.querySelector('span');
			if (btnSpan) btnSpan.textContent = 'Sending…';
			else submitButton.textContent = 'Sending…';

			// Build mailto link (preserves original behavior)
			const name = nameInput.value;
			const email = emailInput.value;
			const message = messageInput.value;
			const mailtoLink = `mailto:alveerraaa@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;

			setTimeout(() => {
				window.location.href = mailtoLink;

				successMessage.classList.add('show');
				contactForm.reset();

				submitButton.disabled = false;
				if (btnSpan) btnSpan.textContent = 'Send Message →';
				else submitButton.textContent = 'Send Message';

				setTimeout(() => {
					successMessage.classList.remove('show');
				}, 5000);
			}, 1000);
		}
	});
}
