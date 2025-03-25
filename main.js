// main.js

// Import Three.js and GLTFLoader from a CDN for ES6 modules
import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

// Function to initialize a Three.js scene in a given container and load a GLB model
function initScene(containerId, glbPath) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }

  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Add lighting to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Load the GLB model using GLTFLoader
  const loader = new GLTFLoader();
  loader.load(
    glbPath,
    (gltf) => {
      scene.add(gltf.scene);
    },
    undefined,
    (error) => {
      console.error("Error loading model: ", error);
      // Fallback: add a simple rotating cube if the model fails to load
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshStandardMaterial({ color: 0xff5722 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      // Animate the fallback cube
      const fallbackAnimate = function () {
        requestAnimationFrame(fallbackAnimate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      fallbackAnimate();
    }
  );

  // Position the camera
  camera.position.z = 2;

  // Render loop
  const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
}

// Initialize the scenes for each model container
initScene('three-container-cheese', 'Cheese_Danish.glb');
initScene('three-container-gearbox', 'Gearbox_Conical.glb');

// Mobile menu toggle functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// AR button functionality for launching AR experience
document.querySelectorAll('.ar-button').forEach((button) => {
  button.addEventListener('click', () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const fileToOpen = isIOS ? button.getAttribute('data-ios') : button.getAttribute('data-glb');

    // Create a temporary anchor element to trigger AR Quick Look or Scene Viewer
    const anchor = document.createElement('a');
    anchor.setAttribute('rel', 'ar');
    anchor.setAttribute('href', fileToOpen);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  });
});
