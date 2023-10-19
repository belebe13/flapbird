const bird = document.querySelector('.bird');
const gameContainer = document.querySelector('.game-container');
const pipe = document.querySelector('.pipe');

let birdBottom = 250;
let gravity = 2;
let gameSpeed = 10;
let isGameOver = false;

function startGame() {
    if (birdBottom > 0 && !isGameOver) {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        requestAnimationFrame(startGame);
    } else {
        gameOver();
    }
}

function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';
}

function gameOver() {
    alert('Game Over!');
    isGameOver = true;
}

document.addEventListener('keydown', jump);
startGame();
