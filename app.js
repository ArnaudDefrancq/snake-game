const gameBoard = document.getElementById("game-board");
const scoreText = document.getElementById("score");
const btnReset = document.getElementById("reset");
const unitSize = 25;
let x = 0;
let y = 0;
let direction = false;
const context = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const snakeColor = "black";
const foodColor = "red";
const boardBackground = "white";
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let running = false;
let score = 0;

let snake = [
  {
    x: unitSize * 4,
    y,
  },
  {
    x: unitSize * 3,
    y,
  },
  {
    x: unitSize * 2,
    y,
  },
  {
    x: unitSize,
    y,
  },
  {
    x,
    y,
  },
];

const gameStart = () => {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
};

const nextTick = () => {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else {
    displayGameOver();
  }
};

const createFood = () => {
  const randomFood = (min, max) => {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  };
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
};

const drawFood = () => {
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, unitSize, unitSize);
};

const clearBoard = () => {
  context.fillStyle = boardBackground;
  context.fillRect(0, 0, gameWidth, gameHeight);
};

const drawSnake = () => {
  context.fillStyle = snakeColor;
  snake.forEach((snakePart) => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
};

const moveSnake = () => {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  // if food eat
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
};

const checkGameOver = () => {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }

  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
};

const displayGameOver = () => {
  context.font = "50px MV Boli";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("Game Over", gameWidth / 2, gameHeight / 2);
  running = false;
};

const changeDirection = (e) => {
  const keyPress = e.keyCode;
  const L = 37;
  const U = 38;
  const R = 39;
  const D = 40;

  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  const goingRight = xVelocity == unitSize;
  const goingLeft = xVelocity == -unitSize;

  switch (true) {
    case keyPress == L && !goingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPress == U && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPress == R && !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPress == D && !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
};
const resetGame = () => {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    {
      x: unitSize * 4,
      y,
    },
    {
      x: unitSize * 3,
      y,
    },
    {
      x: unitSize * 2,
      y,
    },
    {
      x: unitSize,
      y,
    },
    {
      x,
      y,
    },
  ];
  gameStart();
};

gameStart();

window.addEventListener("keydown", changeDirection);
btnReset.addEventListener("click", resetGame);
