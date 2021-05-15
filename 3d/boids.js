width = 0;
height = 0;
boids = [];
visualRange = 100;
numberOfBoids = 1000;
shouldDrawTrace = true;
maxBounds = new THREE.Vector3(15.0,15.0,15.0);
camera = undefined;

function createBoid(position) {
    const radius = 0.1;
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);
    let geometry = new THREE.SphereGeometry(radius);
    let material = new THREE.MeshPhongMaterial({color : "rgb(" + r + ", " + g + ", " + b + ")"});
    let boid = new THREE.Mesh(geometry, material);
    boid.position.set(position.x, position.y, position.z);
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
    camera = new THREE.PerspectiveCamera(55, 1.0, 1, 1000);
    camera.position.set(40, 20, 30);
    camera.lookAt(center);

    let light = new THREE.DirectionalLight(0xFFFFFF);
    scene.add(light);
    light.position.set(1,1,1);

    var cube = createWireframe(10,10,10);
    scene.add(cube);

    setupBoids()

    for (var boid of boids) {
        var sphere = createBoid(boid.position);
        scene.add(sphere);
    }
    renderer.render(scene, camera);
}

function setupBoids() {
    for (var i = 0; i < numberOfBoids; i++) {
        boids.push( {
            position: new THREE.Vector3(Math.random()*maxBounds.x,Math.random()*maxBounds.y,Math.random()*maxBounds.z),
            velocity: new THREE.Vector3(0,0,0),
            history: [],
        });
        
    }
}

window.onload = () => {
    init();
}