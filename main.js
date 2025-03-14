document.addEventListener("DOMContentLoaded", () => {
  // Toggle mobile menu
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Attach event listeners to all "Open in AR" buttons
  const arButtons = document.querySelectorAll('.ar-button');
  arButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        // For iOS: create a temporary anchor with rel="ar" to launch AR Quick Look
        const iosSrc = button.getAttribute('data-ios');
        const anchor = document.createElement('a');
        anchor.setAttribute('href', iosSrc);
        anchor.setAttribute('rel', 'ar');
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      } else {
        // For non-iOS devices: use model-viewer's AR activation
        const modelId = button.getAttribute('data-model-id');
        const modelViewerEl = document.getElementById(modelId);
        if (modelViewerEl && typeof modelViewerEl.activateAR === 'function') {
          modelViewerEl.activateAR();
        }
      }
    });
  });
});
