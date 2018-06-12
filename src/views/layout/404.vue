<template>
  <div class="page-container">
    <canvas id="space" class="space"></canvas>
    <div class="error-box">
      <h3 class="error-title">404</h3>
      <p class="error-desc"> 抱歉，页面没有找到！</p>
    </div>
  </div>
</template>
<script>
function Space(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.particles = [];
  this.ratio = window.innerHeight < 400 ? 0.6 : 1;
  this.r = 400;
  this.counter = 0;
}
Space.prototype.init = function () {
  this.createElement();
  this.loop();
};
Space.prototype.createElement = function () {
  var scale = this.ratio;
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.canvas.style.background = 'rgba(0, 0, 0, 0)';
  this.canvas.style.position = 'absolute';
  this.canvas.id = 'canvas';
  this.ctx.transform(scale, 0, 0, -scale, this.canvas.width / 2, this.canvas.height / 2);
  for (var i = 0; i < 450; i++) {
    this.createParticle();
  }
};
Space.prototype.createParticle = function () {
  this.particles.push({
    color: Math.random() > 0.5 ? "rgba(255, 255, 255, 1)" : "rgba(53, 168, 224, 1)",
    radius: Math.random() * 5,
    x: Math.cos(Math.random() * 7 + Math.PI) * this.r,
    y: Math.sin(Math.random() * 7 + Math.PI) * this.r,
    ring: Math.random() * this.r * 3,
    move: ((Math.random() * 4) + 1) / 3500,
    random: Math.random() * 7
  });
};
Space.prototype.moveParticle = function (p) {
  p.ring = Math.max(p.ring - 1, this.r);
  p.random += p.move;
  p.x = Math.cos(p.random + Math.PI) * p.ring;
  p.y = Math.sin(p.random + Math.PI) * p.ring;
};
Space.prototype.resetParticle = function (p) {
  p.ring = Math.random() * this.r * 3;
  p.radius = Math.random() * 5;
};
Space.prototype.disappear = function (p) {
  if (p.radius < 0.8) {
    this.resetParticle(p);
  }
  p.radius *= 0.994;
};
Space.prototype.draw = function (p) {
  this.ctx.beginPath();
  this.ctx.fillStyle = p.color;
  this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  this.ctx.fill();
};
Space.prototype.loop = function () {
  this.ctx.clearRect(-this.canvas.width , -this.canvas.height, this.canvas.width * 2, this.canvas.height * 2);
  if (this.counter < this.particles.length) {
    this.counter++;
  }
  // this.ctx.shadowBlur = 20;
  // this.ctx.shadowColor = "#fff";
  for (var i = 0; i < this.counter; i++) {
    this.disappear(this.particles[i]);
    this.moveParticle(this.particles[i]);
    this.draw(this.particles[i]);
  }
  requestAnimationFrame(this.loop.bind(this));
};
export default {
  mounted() {
    const spacex = new Space(document.getElementById('space'))
    spacex.init()
  }
}
</script>

<style lang="less" scoped>
.space {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.page-container {
  margin-top: 50%;
  text-align: center;
  .error-box{
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -50px;
  }
  .error-title{
    font-size:36px;
    color:#ed6b75;
  }
  .error-desc{
    padding:15px;
    margin-bottom:20px;
    font-size: 16px;
    color: #c0ccda;
  }
}
</style>