const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cellSize = 20;
const width = canvas.width / cellSize;
const height = canvas.height / cellSize;

let snake = [{ x: Math.floor(width / 2), y: Math.floor(height / 2) }];
let direction = 'right';
let food = {};
let score = 0;
let gameLoop;

function drawSnake() {
	ctx.fillStyle = 'green';
	snake.forEach((cell) => {
		ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
	});
}

function moveSnake() {
	let head = { ...snake[0] };
	if (direction === 'up') {
		head.y--;
	} else if (direction === 'right') {
		head.x++;
	} else if (direction === 'down') {
		head.y++;
	} else if (direction === 'left') {
		head.x--;
	}
	snake.unshift(head);
	if (head.x === food.x && head.y === food.y) {
		score++;
		newFood();
	} else {
		snake.pop();
	}
}

function newFood() {
	food = {
		x: Math.floor(Math.random() * width),
		y: Math.floor(Math.random() * height),
	};
	if (snake.some((cell) => cell.x === food.x && cell.y === food.y)) {
		newFood();
	}
}

function drawFood() {
	ctx.fillStyle = 'red';
	ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function drawScore() {
	ctx.fillStyle = 'black';
	ctx.font = '20px Arial';
	ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameOver() {
	clearInterval(gameLoop);
	ctx.fillStyle = 'black';
	ctx.font = '50px Arial';
	ctx.fillText('Game Over', canvas.width / 2 - 125, canvas.height / 2 - 25);
	document.getElementById('replayBtn').style.display = 'block';
}

function update() {
	moveSnake();
	if (
		snake[0].x < 0 ||
		snake[0].x >= width ||
		snake[0].y < 0 ||
		snake[0].y >= height ||
		snake.slice(1).some((cell) => cell.x === snake[0].x && cell.y === snake[0].y)
	) {
		gameOver();
		return;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();
	drawFood();
	drawScore();
}

newFood();
gameLoop = setInterval(update, 100);

document.addEventListener('keydown', (event) => {
	if (event.code === 'ArrowUp' && direction !== 'down') {
		direction = 'up';
	} else if (event.code === 'ArrowRight' && direction !== 'left') {
		direction = 'right';
	} else if (event.code === 'ArrowDown' && direction !== 'up') {
		direction = 'down';
	} else if (event.code === 'ArrowLeft' && direction !== 'right') {
		direction = 'left';
	}
});
