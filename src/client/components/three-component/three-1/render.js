import * as THREE from 'three';

const render = {};

let scene; let camera; let renderer;
let cube;
let timer;

render.init = (options) => {
  const { width = 0, height = 0 } = options || {};
  if (!width && !height) {
    return null;
  }

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.x = 10;
  camera.position.y = 5;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff);
  renderer.setSize(width, height);

  const cubeGeometry = new THREE.BoxGeometry(8, 8, 8);

  const meshMaterial = new THREE.MeshBasicMaterial();
  meshMaterial.map = THREE.ImageUtils.loadTexture();

  cube = new THREE.Mesh(cubeGeometry, meshMaterial);

  scene.add(cube);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  document.getElementById('cent').appendChild(renderer.domElement);
}

render.update = () => {
  if (timer) {
    cancelAnimationFrame(timer);
  }
  loop();
  function loop() {
    timer = requestAnimationFrame(loop);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene, camera);
  }
}

export default render;
