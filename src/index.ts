import * as THREE from 'three';
import './styles.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
import GUI from 'lil-gui';




// Debug 
const gui = new GUI();



// Canvas 

const canvas: HTMLElement = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);


// BufferGeometry 
const bufferGeometry = new THREE.BufferGeometry();

const quantity = 500;
const arrayLength = quantity * 3 * 3;
const positions = new Float32Array(arrayLength);

for (let i=0; i < arrayLength; i++) {
    positions[i] = (Math.random() - 0.5) * 2;
}


// // one Vertex
// positions[0] = 0;
// positions[1] = 0;
// positions[2] = 0;

// // second 
// positions[3] = 0;
// positions[4] = 1;
// positions[5] = 0;


// //third
// positions[6] = 1;
// positions[7] = 0;
// positions[8] = 0;



const bufferAtribute = new THREE.BufferAttribute(positions, 3);

bufferGeometry.setAttribute('position', bufferAtribute);

// Material
const materialRed = new THREE.MeshBasicMaterial({
    color: '#FF0000',
    wireframe: true
})
const materialGreen = new THREE.MeshBasicMaterial({
    color: '#68da66',
    
})
const materialBlue = new THREE.MeshBasicMaterial({
    color: '#a5f7f4',
    wireframe: true
})

const materialBuffer = new THREE.MeshBasicMaterial({
    color: '#a523f4',
    // wireframe: true,
})

const AxesHelper = new THREE.AxesHelper(5);

// scene.add(AxesHelper);
// Mesh --> 
const group = new THREE.Group();
const mesh1 = new THREE.Mesh(boxGeometry, materialRed);
const mesh2 = new THREE.Mesh(boxGeometry, materialGreen);
const mesh3 = new THREE.Mesh(boxGeometry, materialBlue);
const mesh4 = new THREE.Mesh(bufferGeometry, materialBuffer);
mesh1.position.x = 1;
mesh1.position.y = 0.5;
mesh3.position.x = -1;
mesh3.position.y = 0.5;
mesh1.scale.y = 2;
mesh3.scale.y = 2;

group.add(mesh1, mesh2, mesh3);
// group.rotation.set(0.2, Math.PI / 3, 0);
scene.add(group);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const debugObj = {
}
debugObj['animate'] = () =>  {
    gsap.to(mesh1.rotation, {
       'y': mesh1.rotation.y + Math.PI * 2
    })
}
gui.add(mesh1.material, 'wireframe').name("mesh1");
gui.add(mesh2.material, 'wireframe').name("mesh2");
gui.add(mesh3.material, 'wireframe').name("mesh3");
gui.addColor(mesh1.material, 'color');
gui.add(group.position, 'y')
    .min(-1)
    .max(1)
    .step(0.01);
gui.add(debugObj, 'animate');

//Camera 
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height);
// camera.position.x = 0.5;
// camera.position.y = 0.5;
camera.position.z = 3;
camera.lookAt(group.position);
scene.add(camera);


const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// Renderer 

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height);

// const clock = new THREE.Clock();

//Animations
// gsap.to(mesh1.rotation, {duration: 1, y: Math.PI * 2, delay: 2})
// gsap.to(mesh3.rotation, {duration: 2, y: Math.PI * 2, delay: 1})

const cursor = {
    position: {
        x: 0,
        y: 0
    }
}

const tick = () =>
{
    // Update objects
    // group.rotation.y = clock.getElapsedTime();
    // group.position.x = Math.sin(cursor.position.x * Math.PI * 2)  * 3
    // group.position.z = Math.cos(cursor.position.x  * Math.PI * 2) * 3
    // group.position.y = cursor.position.y * 5
    // group.position.y = cursor.position.y * 2
    // Render
    // camera.lookAt(group.position);
    orbitControls.update();
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();

// Control
document.onkeydown = ((ev: KeyboardEvent) => {
    if (ev.ctrlKey) {
        group.rotateY(0.1);
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick)
    }
 });

 window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    
});

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement;

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
    
    }
})