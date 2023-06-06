import { pseudoRandom, generatePseudoRandomString } from "../lib/random.js";

const dotRadius = 1;
const cellSize = 20;

class MazeCanvas extends HTMLElement {
  width = 16;
  height = 16;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.maze = {};

    for (let x = 0; x <= this.width; x++) {
      for (let y = 0; y <= this.height; y++) {
        this.maze[`${x},${y}`] = {
          x,
          y,
          walls: { top: true, left: true, right: true, bottom: true },
        };
      }
    }
  }

  connectedCallback() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.background = "var(--text-color)";
    this.shadowRoot.appendChild(this.canvas);

    this.canvas.width = this.width * cellSize; // Adjust the cell size as needed
    this.canvas.height = this.height * cellSize;

    this.drawCells();
    this.openWallEverySecond();
  }

  drawCells() {
    const ctx = this.canvas.getContext("2d");

    Object.values(this.maze).forEach(({ x, y, walls }) => {
      const onlyWalls = walls.top && walls.left && walls.right && walls.bottom;
      if (onlyWalls) {
        ctx.fillStyle = "rgba(128, 128, 128, 0.5)"; // Adjust the color and opacity as desired
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }

      ctx.strokeStyle = "rgba(0, 0, 0, 1)"; // Adjust the color and opacity of the walls
      ctx.lineWidth = 1; // Adjust the line thickness as desired

      if (walls.top) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, y * cellSize);
        ctx.lineTo((x + 1) * cellSize, y * cellSize);
        ctx.stroke();
      }

      if (walls.right) {
        ctx.beginPath();
        ctx.moveTo((x + 1) * cellSize, y * cellSize);
        ctx.lineTo((x + 1) * cellSize, (y + 1) * cellSize);
        ctx.stroke();
      }

      if (walls.bottom) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, (y + 1) * cellSize);
        ctx.lineTo((x + 1) * cellSize, (y + 1) * cellSize);
        ctx.stroke();
      }

      if (walls.left) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, y * cellSize);
        ctx.lineTo(x * cellSize, (y + 1) * cellSize);
        ctx.stroke();
      }
    });
  }

  openWallEverySecond() {
    const randomValue = pseudoRandom(randomString)();
  }
}

customElements.define("c-maze-builder-1", MazeCanvas);
