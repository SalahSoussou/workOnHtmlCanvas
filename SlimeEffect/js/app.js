const cnv = document.getElementById("cnv"),
  ctx = cnv.getContext("2d");

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;
ctx.fillStyle = "white";

class Ball {
  constructor(effect) {
    this.effect = effect;
    this.x = this.effect.width * Math.random();
    this.y = this.effect.height * Math.random();
    this.radius = Math.random() * 85 + 15;
    this.speed = { x: Math.random() - 0.5, y: Math.random() - 0.5 };
  }
  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;
    if (this.x < this.radius || this.x + this.radius > this.effect.width)
      this.speed.x *= -1;
    if (this.y < this.radius || this.y + this.radius > this.effect.height)
      this.speed.y *= -1;
    this.draw(ctx);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  reset() {
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
  }
}

class handellEffect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.ballArray = [];
  }
  init(ballsNumber) {
    for (let i = 0; i < ballsNumber; i++) {
      this.ballArray.push(new Ball(this));
    }
  }
  update() {
    this.ballArray.forEach((ball) => ball.update());
  }
  //   draw(ctx) {
  //     this.ballArray.forEach((ball) => ball.draw(ctx));
  //   }
  reset(newW, newH) {
    this.width = newW;
    this.height = newH;
    this.ballArray.forEach((ball) => ball.reset());
  }
}
const effect = new handellEffect(cnv.width, cnv.height);
effect.init(50);

function animate() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  effect.update();
  //   effect.draw(ctx);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  ctx.fillStyle = "white";
  effect.reset(cnv.width, cnv.height);
});

animate();
