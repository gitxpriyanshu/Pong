const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10, paddleHeight = 80;
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 4, ballSpeedY = 4;
const paddleSpeed = 6;
let player1Score = 0, player2Score = 0;
const winningScore = 5;
let gameRunning = true;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    if (!gameRunning) return;
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;
    if (ballX <= paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) ballSpeedX *= -1;
    if (ballX >= canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) ballSpeedX *= -1;
    
    if (ballX < 0) { player2Score++; checkGameOver(); resetBall(); }
    if (ballX > canvas.width) { player1Score++; checkGameOver(); resetBall(); }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawRect(0, player1Y, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, "white");
    drawBall(ballX, ballY, 10, "white");
    document.getElementById("player1-score").textContent = player1Score;
    document.getElementById("player2-score").textContent = player2Score;
}

function checkGameOver() {
    if (player1Score >= winningScore || player2Score >= winningScore) {
        gameRunning = false;
        let winner = player1Score >= winningScore ? "Player 1" : "Player 2";
        document.getElementById("gameOverMessage").textContent = `${winner} Wins!`;
        document.getElementById("gameOverMessage").classList.remove("hidden");
    }
}

function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();

document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;
    if (e.key === "w" && player1Y > 0) player1Y -= paddleSpeed;
    if (e.key === "s" && player1Y < canvas.height - paddleHeight) player1Y += paddleSpeed;
    if (e.key === "ArrowUp" && player2Y > 0) player2Y -= paddleSpeed;
    if (e.key === "ArrowDown" && player2Y < canvas.height - paddleHeight) player2Y += paddleSpeed;
});
