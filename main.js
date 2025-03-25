// Import Three.js as an ES6 module from a CDN
import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

// Utility function to detect if the device is iOS
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Set up AR button click handlers
document.querySelectorAll('.ar-button').forEach(button => {
  button.addEventListener('click', () => {
    // Choose model based on device type. For iOS use the USDZ file; for others use the GLB.
    const modelUrl = isIOS()
      ? button.getAttribute('data-ios')
      : button.getAttribute('data-glb');
    if (modelUrl) {
      window.location.href = modelUrl;
    } else {
      alert('AR model not available.');
    }
  });
});

// Function to initialize a Three.js scene in a given container and load a GLB model
function initScene(containerId, modelUrl) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Load the GLB model using GLTFLoader
  const loader = new GLTFLoader();
  loader.load(
    modelUrl,
    (gltf) => {
      const model = gltf.scene;
      // Optionally adjust the model scale or position here if needed
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error('Error loading model:', error);
    }
  );

  // Animation loop to render the scene
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

// Initialize Three.js scenes for both model containers with their respective GLB models
initScene('three-container-cheese', 'Cheese_Danish.glb');
initScene('three-container-gearbox', 'Gearbox_Conical.glb');

// Mobile menu toggle for responsive navigation
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}
