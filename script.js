const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let birdX = 50;
let birdY = canvas.height / 2;
let birdSpeedY = 0;
const gravity = 0.5;
const jump = -10;
let obstacles = [];

// Main game loop
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bird
  ctx.fillStyle = "yellow";
  ctx.fillRect(birdX, birdY, 40, 40);

  // Update bird position and speed
  birdSpeedY += gravity;
  birdY += birdSpeedY;

  // Draw obstacles
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    obstacles[i].x -= 2;

    // Check for collision
    if (
      birdX < obstacles[i].x + obstacles[i].width &&
      birdX + 40 > obstacles[i].x &&
      birdY < obstacles[i].y + obstacles[i].height &&
      birdY + 40 > obstacles[i].y
    ) {
      alert("Game Over");
      resetGame();
    }
  }

  // Request animation frame
  requestAnimationFrame(draw);
}

// Create obstacles
function createObstacle() {
  const obstacleHeight = Math.floor(Math.random() * 200) + 50;
  obstacles.push({
    x: canvas.width,
    y: 0,
    width: 30,
    height: obstacleHeight,
  });
  obstacles.push({
    x: canvas.width,
    y: obstacleHeight + 100,
    width: 30,
    height: canvas.height - obstacleHeight - 100,
  });
}

// Handle key presses
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    birdSpeedY = jump;
  }
});

// Reset the game
function resetGame() {
  birdY = canvas.height / 2;
  birdSpeedY = 0;
  obstacles = [];
}

// Create initial obstacle
createObstacle();

// Start the game loop
draw();
setInterval(createObstacle, 2000); // Create new obstacles every 2 seconds
