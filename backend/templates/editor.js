const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let text = "Sample Name";
let x = 300, y = 300;
let dragging = false;

document.getElementById("templateInput").addEventListener("change", e => {
  const file = e.target.files[0];
  img.src = URL.createObjectURL(file);
});

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  draw();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  ctx.font = "48px serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);

  document.getElementById("xVal").innerText = Math.round(x);
  document.getElementById("yVal").innerText = Math.round(y);
}

canvas.addEventListener("mousedown", e => {
  const dx = e.offsetX - x;
  const dy = e.offsetY - y;
  if (Math.abs(dx) < 150 && Math.abs(dy) < 40) {
    dragging = true;
  }
});

canvas.addEventListener("mousemove", e => {
  if (dragging) {
    x = e.offsetX;
    y = e.offsetY;
    draw();
  }
});

canvas.addEventListener("mouseup", () => dragging = false);
canvas.addEventListener("mouseleave", () => dragging = false);
