document.addEventListener("DOMContentLoaded", function() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenu.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });
});
