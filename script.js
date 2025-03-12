document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
});
