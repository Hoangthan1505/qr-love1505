// QR code
new QRCode(document.getElementById("qrcode"), {
  text: "https://example.com", // <-- Thay bằng link bạn muốn
  width: 120,
  height: 120,
  colorDark: "#000000",
  colorLight: "#ffffff",
});

// Canvas heart animation
const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function heartFunction(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x, y };
}

class Particle {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = Math.random() * 1.5 + 1;
    this.life = 100;
    this.vx = Math.cos(angle) * (Math.random() * 3);
    this.vy = Math.sin(angle) * (Math.random() * 3);
    this.color = "red";
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  for (let i = 0; i < 20; i++) {
    const t = Math.random() * 2 * Math.PI;
    const { x, y } = heartFunction(t);
    particles.push(new Particle(centerX + x * 10, centerY - y * 10, t));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw(ctx);
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

