document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Hide AR section if not on an iOS device
  if (!/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const arSection = document.getElementById('ar');
    if (arSection) {
      arSection.style.display = 'none';
    }
  }
});
