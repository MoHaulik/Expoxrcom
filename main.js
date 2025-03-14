// Import Three.js and GLTFLoader as ES modules
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r150/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

// Helper function to initialize a Three.js scene in a given container with a model loaded from modelUrl
function initThreeScene(containerId, modelUrl) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 1, 3);
  
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Load the GLB model
  const loader = new GLTFLoader();
  loader.load(
    modelUrl,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Optionally center the model
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        model.rotation.y += 0.005;
        renderer.render(scene, camera);
      }
      animate();
    },
    undefined,
    (error) => {
      console.error('Error loading model:', error);
    }
  );

  // Update renderer and camera on window resize
  window.addEventListener('resize', () => {
    if (container) {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  });
}

// Initialize 3D previews for both models
initThreeScene('three-container-cheese', 'Cheese_Danish.glb');
initThreeScene('three-container-gearbox', 'Gearbox_Conical.glb');

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// AR button event handling: on click, detect the device and launch AR accordingly.
const arButtons = document.querySelectorAll('.ar-button');
arButtons.forEach(button => {
  button.addEventListener('click', () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const iosSrc = button.getAttribute('data-ios');
    const glbSrc = button.getAttribute('data-glb');
    
    if (isIOS) {
      // For iOS: create a temporary anchor to launch AR Quick Look
      const anchor = document.createElement('a');
      anchor.setAttribute('href', iosSrc);
      anchor.setAttribute('rel', 'ar');
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      // For non-iOS: dynamically create a hidden model-viewer to activate AR
      const tempAR = document.createElement('model-viewer');
      tempAR.setAttribute('src', glbSrc);
      tempAR.setAttribute('ios-src', iosSrc);
      tempAR.setAttribute('ar', '');
      tempAR.style.display = 'none';
      document.body.appendChild(tempAR);
      // Give it a short delay then call activateAR
      setTimeout(() => {
        if (typeof tempAR.activateAR === 'function') {
          tempAR.activateAR();
        }
        document.body.removeChild(tempAR);
      }, 100);
    }
  });
});
