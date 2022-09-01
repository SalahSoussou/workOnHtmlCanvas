cnv.width = 400;
cnv.height = 400;
const ctx = cnv.getContext("2d");

let speed = 7,
  tileCount = 20,
  tileSize = cnv.width / tileCount - 2,
  tail = 0,
  score = 0;
const snakeLength = [];

class Snake {
  constructor() {
    this.headX = 10;
    this.headY = 10;
    this.vlX = 0;
    this.vlY = 0;
  }
  update() {
    addEventListener("keydown", (e) => {
      //UP
      if (e.key === "ArrowUp") {
        if (this.vlY === 1) return;
        this.vlY = -1;
        this.vlX = 0;
      }
      //Down
      if (e.key == "ArrowDown") {
        if (this.vlY === -1) return;
        this.vlY = 1;
        this.vlX = 0;
      }
      //Left
      if (e.key == "ArrowLeft") {
        if (this.vlX === 1) return;
        this.vlY = 0;
        this.vlX = -1;
      }
      //Right
      if (e.key == "ArrowRight") {
        if (this.vlX === -1) return;
        this.vlY = 0;
        this.vlX = 1;
      }
    });
    this.headX += this.vlX;
    this.headY += this.vlY;
    this.draw();
  }
  draw() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeLength.length; i++) {
      let part = snakeLength[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeLength.push(new SnakeBody(this.headX, this.headY));
    while (snakeLength.length > tail) {
      snakeLength.shift();
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(
      this.headX * tileCount,
      this.headY * tileCount,
      tileSize,
      tileSize
    );
  }
}

class Apple {
  constructor() {
    this.x = 5;
    this.y = 5;
  }
  update() {
    if (this.x === snake.headX && this.y === snake.headY) {
      this.x = ~~(Math.random() * tileCount);
      this.y = ~~(Math.random() * tileCount);
      tail++;
      score++;
    }
    this.draw();
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x * tileCount, this.y * tileCount, tileSize, tileSize);
  }
}
class SnakeBody {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function showScore() {
  ctx.fillStyle = "black";
  ctx.font = "16px Verdana";
  ctx.fillText(`Score: ${score}`, 320, 16);
}

let snake = new Snake();
let apple = new Apple();
let gamrOver = false;
function itIsOver() {
  // walls
  if (
    snake.headX < 0 ||
    snake.headX === tileCount ||
    snake.headY < 0 ||
    snake.headY === tileCount
  ) {
    gamrOver = true;
  }
  // body parts

  if (gamrOver) {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "50px Arial";
    ctx.fillText(`Game Over:${score}`, cnv.width / 2, cnv.height / 2);
  }

  return gamrOver;
}

function gameLoop() {
  let isItOver = itIsOver();
  if (isItOver) return;
  ctx.fillStyle = "rgb(37, 190, 91)";
  ctx.fillRect(0, 0, 400, 400);
  snake.update();
  apple.update();
  showScore();
  setTimeout(gameLoop, 1000 / speed);
}
gameLoop();
