
width = 0;
height = 0;

numberOfBoids = 300;
boids = [];

function animationLoop() {
    //reset
    const ctx = document.getElementById("boids").getContext("2d");
    ctx.clearRect(0, 0, width, height);

    for (let boid of boids) {
        drawBoid(ctx, boid);
    }
}

function setupCanvasSize() {
    const canvas = document.getElementById("boids");
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    canvas.style.backgroundColor = "#363537";
}

function setupBoids() {
    for (var i = 0; i < numberOfBoids; i++) {
        boids[boids.length] = {
            x: Math.random() * width,
            y: Math.random() * height,
            dx: Math.random() * 10 - 5,
            dy: Math.random() * 10 - 5,
            history: [],
        };
    }
}

function drawBoid(ctx, boid) {
    const angle = Math.atan2(boid.dy, boid.dx);
    ctx.translate(boid.x, boid.y);
    ctx.rotate(angle);
    ctx.translate(-boid.x, -boid.y);
    ctx.fillStyle = "#ef2d56";
    ctx.beginPath();
    ctx.moveTo(boid.x, boid.y);
    ctx.lineTo(boid.x - 15, boid.y + 5);
    ctx.lineTo(boid.x - 15, boid.y - 5);
    ctx.lineTo(boid.x, boid.y);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

}

window.onload = () => {
    // Make sure the canvas always fills the whole window
    window.addEventListener("resize", setupCanvasSize, false);
    setupCanvasSize();

    // Randomly distribute the boids to start
    setupBoids();

    // Schedule the main animation loop
    window.requestAnimationFrame(animationLoop);
};
