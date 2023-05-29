import { pseudoRandom, generatePseudoRandomString } from "../lib/random.js";

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
    this.drawVisitedCells(width, height);
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

  drawVisitedCells(width, height) {
    const ctx = this.canvas.getContext("2d");

    for (let row = 0; row < height; row += 1) {
      for (let col = 0; col < width; col += 1) {
        const x = col * cellSize;
        const y = row * cellSize;

        const randomString = generatePseudoRandomString(
          [x, y, col, row, this.dataset.seed],
          5
        );

        // Generate a random number between 0 and 1
        const randomValue = pseudoRandom(randomString)();

        // Set a probability threshold for cells to be grey-ish
        const probability = 0.5; // Adjust this value as needed

        // If the random value is below the probability threshold, color the cell grey-ish
        if (randomValue < probability) {
          ctx.fillStyle = "rgba(128, 128, 128, 0.5)"; // Adjust the color and opacity as desired
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }
  }
}

customElements.define("c-maze-3", MazeCanvas);
