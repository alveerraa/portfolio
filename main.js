document.getElementById('sendMail').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const mailtoLink = `mailto:alveerraaa@gmail.com?subject=Contact from ${name}&body=Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
  window.location.href = mailtoLink;
});

// MENU SHOW
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  if(toggle && nav){
      toggle.addEventListener('click', ()=>{
          nav.classList.toggle('show')
      })
  }
}
showMenu('nav-toggle','nav-menu')

// REMOVE MENU MOBILE
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Select all sections with an ID
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__menu a');

const scrollActive = () => {
  let scrollY = window.scrollY;

  sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 80; // Adjust offset to match menu height
      const sectionId = current.getAttribute('id');
      const sectionLink = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          // Remove active-link from all links before adding
          navLinks.forEach(link => link.classList.remove('active-link'));

          // Add active-link only to the current section's link
          sectionLink.classList.add('active-link');
      }
  });
};

// Attach event listener for scroll detection
window.addEventListener('scroll', scrollActive);

// Ensure active state is set on page load
document.addEventListener('DOMContentLoaded', scrollActive);

// SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200,
  reset: true
});

sr.reveal('.home__data, .about__img, .skills__text',{});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400});
sr.reveal('.home__social-icon',{ interval: 200});
sr.reveal('.skills__data, .work__img, .contact__input',{delay: 200});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const successMessage = document.getElementById('success-message');
const submitButton = document.getElementById('sendMail');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate name
nameInput.addEventListener('input', () => {
  if (nameInput.value.trim() === '') {
      nameInput.classList.add('error');
      nameError.classList.add('show');
  } else {
      nameInput.classList.remove('error');
      nameError.classList.remove('show');
  }
});

// Validate email
emailInput.addEventListener('input', () => {
  if (!emailRegex.test(emailInput.value)) {
      emailInput.classList.add('error');
      emailError.classList.add('show');
  } else {
      emailInput.classList.remove('error');
      emailError.classList.remove('show');
  }
});

// Validate message
messageInput.addEventListener('input', () => {
  if (messageInput.value.trim() === '') {
      messageInput.classList.add('error');
      messageError.classList.add('show');
  } else {
      messageInput.classList.remove('error');
      messageError.classList.remove('show');
  }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let isValid = true;
  
  // Validate all fields
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
      // Disable submit button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
          // Show success message
          successMessage.classList.add('show');
          
          // Reset form
          contactForm.reset();
          
          // Reset button state
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
          
          // Hide success message after 5 seconds
          setTimeout(() => {
              successMessage.classList.remove('show');
          }, 5000);
      }, 1500);
  }
});
