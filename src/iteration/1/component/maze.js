const cellSize = 20;
const dotRadius = 1;

class MazeCanvas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const width = 16;
    const height = 16;

    this.canvas = document.createElement("canvas");
    this.canvas.style.background = "var(--text-color)";
    this.shadowRoot.appendChild(this.canvas);

    this.canvas.width = width * cellSize; // Adjust the cell size as needed
    this.canvas.height = height * cellSize;

    this.drawGrid(width, height);
  }

  drawGrid(width, height) {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "black";

    for (let row = 0; row < height - 1; row += 1) {
      for (let col = 0; col < width - 1; col += 1) {
        const x = col * cellSize + cellSize;
        const y = row * cellSize + cellSize;

        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, dotRadius * Math.PI);
        ctx.fill();
      }
    }
  }
}

customElements.define("c-maze-1", MazeCanvas);
