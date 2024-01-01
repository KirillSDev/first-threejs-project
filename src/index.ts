import * as THREE from 'three';


// Canvas 

const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// Material
const materialRed = new THREE.MeshBasicMaterial({
    color: '#FF0000',
    wireframe: true
})
const materialGreen = new THREE.MeshBasicMaterial({
    color: '#68da66',
    wireframe: true
})
const materialBlue = new THREE.MeshBasicMaterial({
    color: '#a5f7f4',
    wireframe: true
})


const AxesHelper = new THREE.AxesHelper(5);

scene.add(AxesHelper);
// Mesh --> 
const group = new THREE.Group();
const mesh1 = new THREE.Mesh(boxGeometry, materialRed);
const mesh2 = new THREE.Mesh(boxGeometry, materialGreen);
const mesh3 = new THREE.Mesh(boxGeometry, materialBlue);
mesh1.position.x = 1;
mesh1.position.y = 0.5;
mesh3.position.x = -1;
mesh3.position.y = 0.5;
mesh1.scale.y = 2;
mesh3.scale.y = 2;

group.add(mesh1, mesh2, mesh3);
group.rotation.set(0.2, Math.PI / 3, 0);
scene.add(group);

const sizes = {
    width: 720,
    height: 540,
}

//Camera 
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height);
camera.position.x = 0.5;
camera.position.y = 0.5;
camera.position.z = 3;
camera.lookAt(group.position);
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
        group.rotateY(0.1);
        renderer.render(scene, camera);
    }
 });