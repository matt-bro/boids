
width = 0;
height = 0;

numberOfBoids = 1000;
boids = [];
visualRange = 100;

function animationLoop() {
    //reset
    const ctx = document.getElementById("boids").getContext("2d");
    ctx.clearRect(0, 0, width, height);
    for (let boid of boids) {
        flyTowardsCenter(boid);
        avoidOthers(boid);
        matchVelocity(boid);
        limitVelocity(boid);
        keepWithinBounds(boid);

        boid.x += boid.dx;
        boid.y += boid.dy;
        //boid.history.push([boid.x, boid.y])
        //boid.history = boid.history.slice(-50);
        drawBoid(ctx, boid);
    }
    window.requestAnimationFrame(animationLoop);
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

function distance(boid1, boid2) {
    return Math.sqrt(
        (boid1.x - boid2.x) * (boid1.x - boid2.x) +
        (boid1.y - boid2.y) * (boid1.y - boid2.y),
    );
}

function flyTowardsCenter(boid) {
    //find the center of the closes boids
    const centeringFactor = 0.05;

    var centerX = 0;
    var centerY = 0;
    var numberOfBoidsInRange = 0;

    for (let otherBoid of boids) {
        if (distance(boid, otherBoid) < visualRange) {
            centerX += otherBoid.x;
            centerY += otherBoid.y;
            numberOfBoidsInRange += 1;
        }
    }
    if (numberOfBoidsInRange) {
        centerX = centerX / numberOfBoidsInRange;
        centerY = centerY / numberOfBoidsInRange;

        boid.dx += (centerX - boid.x) * centeringFactor;
        boid.dy += (centerY - boid.y) * centeringFactor;
    }
}

function keepWithinBounds(boid) {
    const margin = 300;
    const turnFactor = 1;

    if (boid.x < margin) {
        boid.dx += turnFactor;
    }
    if (boid.y < margin) {
        boid.dy += turnFactor;
    }
    if (boid.x > width - margin) {
        boid.dx -= turnFactor;
    }
    if (boid.y > height - margin) {
        boid.dy -= turnFactor;
    }
}

function limitVelocity(boid) {
    const velocityLimit = 15;
    const velocity = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
    if (velocity > velocityLimit) {
        boid.dx = (boid.dx / velocity) * velocityLimit;
        boid.dy = (boid.dy / velocity) * velocityLimit;
    }
}

function matchVelocity(boid) {
    const matchingFactor = 0.05;

    let avgDx = 0;
    let avgDy = 0;
    let numberOfBoidsInRange = 0;

    for (let otherBoid of boids) {
        if (distance(boid, otherBoid) < visualRange) {
            avgDx += otherBoid.dx;
            avgDy += otherBoid.dy;
            numberOfBoidsInRange += 1;
        }
    }

    if (numberOfBoidsInRange) {
        avgDx = avgDx / numberOfBoidsInRange;
        avgDy = avgDy / numberOfBoidsInRange;

        boid.dx += (avgDx - boid.dx) * matchingFactor;
        boid.dy += (avgDy - boid.dy) * matchingFactor;
    }
}


function avoidOthers(boid) {
    const minDistance = 20;
    const avoidFactor = 0.05;

    let translateX = 0;
    let translateY = 0;

    for (let otherBoid of boids) {
        if (otherBoid !== boid) {
            if (distance(boid, otherBoid) < minDistance) {
                translateX += (boid.x - otherBoid.x);
                translateY += (boid.y - otherBoid.y);
            }
        }
    }

    boid.dx += translateX * avoidFactor;
    boid.dy += translateY * avoidFactor;
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
