document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Device detection: show iOS AR experience on iOS, otherwise show WebXR
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const arIosSection = document.getElementById('ar-ios');
  const arWebXRSection = document.getElementById('ar-webxr');

  if (isIOS) {
    if (arIosSection) arIosSection.style.display = 'block';
    if (arWebXRSection) arWebXRSection.style.display = 'none';
  } else {
    if (arIosSection) arIosSection.style.display = 'none';
    if (arWebXRSection) arWebXRSection.style.display = 'block';
  }
});
