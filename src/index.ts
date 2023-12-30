import * as THREE from 'three';


// Canvas 

const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// Material
const material = new THREE.MeshBasicMaterial({
    color: '#FF0000',
    wireframe: true
})

// Mesh --> 
const mesh = new THREE.Mesh(boxGeometry, material);
mesh.rotateX(0.2);
mesh.rotateY(15);

scene.add(mesh);

const sizes = {
    width: 720,
    height: 540,
}

//Camera 
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height);
camera.position.x = 0.5;
camera.position.y = 0.5;
camera.position.z = 3;
scene.add(camera);

// Renderer 

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

// Control
document.onkeydown = ((ev: KeyboardEvent) => {
    if (ev.ctrlKey) {
         mesh.rotateY(0.1);
         renderer.render(scene, camera);
    }
 });