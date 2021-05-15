width = 0;
height = 0;
boids = [];
visualRange = 100;
numberOfBoids = 1000;
shouldDrawTrace = true;
maxBounds = new THREE.Vector3(10,10,10);
camera = undefined;

function createBoid(position) {
    const radius = 4;
    const color = 0x00ffff;
    let geometry = new THREE.SphereGeometry(radius);
    let material = new THREE.MeshPhongMaterial(color);
    let boid = new THREE.Mesh(geometry, material);
    boid.position = position;
    return boid
}

function createWireframe(x,y,z) {
    const color = 0x00ff00;
    const w = 15, h = 15, d = 15;
    var boxGeometry = new THREE.BoxGeometry(w,h,d);
    var geometry = new THREE.EdgesGeometry(boxGeometry);
    var material = new THREE.LineBasicMaterial(color);
    var cube = new THREE.LineSegments(geometry, material);
    cube.position.set(x,y,z)
    return cube;
}

function init() {
    var container = document.getElementById("container");

    width = window.innerWidth;
    height = window.innerHeight;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    
    container.appendChild(renderer.domElement);

    var center = new THREE.Vector3(5,5,5);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, 1.0, 1, 1000);
    camera.position.set(30, 20, 30);
    camera.lookAt(center);

    let light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(1,1,1);
    scene.add(light);

    var cube = createWireframe(5,5,5);
    scene.add(cube);

    renderer.render(scene, camera);
}

function setupBoids() {
    for (var i = 0; i < numberOfBoids; i++) {
        boids[boids.length] = {
            position: new THREE.Vector3(maxBounds.x,maxBounds.y,maxBounds.z),
            velocity: new THREE.Vector3(0,0,0),
            history: [],
        };
    }
}

window.onload = () => {
    init();
}