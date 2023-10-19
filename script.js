const bird = document.querySelector('.bird');
const gameContainer = document.querySelector('.game-container');
const pipe = document.querySelector('.pipe');

let birdBottom = 200;
let birdLeft = 150;
let gravity = 2;
let gameSpeed = 2;
let isGameOver = false;

function startGame() {
    if (birdBottom > 0 && !isGameOver) {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
        requestAnimationFrame(startGame);
    }
}

startGame();

function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';
}

document.addEventListener('keydown', jump);

function checkCollision() {
    const birdRect = bird.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    if (
        birdRect.bottom > pipeRect.top &&
        birdRect.top < pipeRect.bottom &&
        birdRect.right > pipeRect.left &&
        birdRect.left < pipeRect.right
    ) {
        isGameOver = true;
        alert('Game Over!');
    }
}

function movePipe() {
    let pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue('left'));
    pipeLeft -= gameSpeed;
    pipe.style.left = pipeLeft + 'px';

    if (pipeLeft < -80) {
        pipeLeft = 400;
        pipe.style.height = Math.floor(Math.random() * 400) + 'px';
    }

    checkCollision();

    if (!isGameOver) {
        requestAnimationFrame(movePipe);
    }
}

movePipe();
