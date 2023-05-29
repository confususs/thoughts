import { shuffleArray } from "../lib/random.js";

class SeededChoice extends HTMLElement {
  connectedCallback() {
    const template = document.createElement("template");

    const rows = [
      { seed: "ABCD", prefix: "1", choices: ["left", "right", "up", "down"] },
      { seed: "ABCD", prefix: "2", choices: ["left", "right", "up", "down"] },
      { seed: "ABCD", prefix: "3", choices: ["left", "right", "up", "down"] },
      { seed: "ABCD", prefix: "4", choices: ["left", "right", "up", "down"] },
      { seed: "ABCD", prefix: "5", choices: ["left", "right", "up", "down"] },
      { seed: "ABCD", prefix: "6", choices: ["left", "right", "up", "down"] },
      { seed: "ABCD", prefix: "7", choices: ["left", "right", "up", "down"] },
      { seed: "ABCD", prefix: "8", choices: ["left", "right", "up", "down"] },
      { seed: "ABCD", prefix: "9", choices: ["left", "right", "up", "down"] },
      { seed: "BENW", prefix: "1", choices: ["left", "right", "up", "down"] },
      { seed: "GNWF", prefix: "1", choices: ["left", "right", "up", "down"] },
      { seed: "OINH", prefix: "1", choices: ["left", "right", "up", "down"] },
      { seed: "VYEQ", prefix: "1", choices: ["left", "right", "up", "down"] },
    ];

    rows.forEach((row, i) => {
      const shuffledArray = shuffleArray(row.choices, row.prefix + row.seed);
      const [choice] = shuffledArray;
      rows[i].result = choice;
    });

    const tableBody = rows
      .map(
        (row) =>
          `<tr><td>${row.seed}</td><td>${row.prefix}</td><td>${row.choices.join(
            ", "
          )}</td><td>${row.result}</td></tr>`
      )
      .join("");

    template.innerHTML = `
      <table>
        <thead><tr><td>Seed</td><td>Prefix</td><td>Choices</td><td>Result</td></tr></thead>
        ${tableBody}
      </table>
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("c-seeded-choice-table-2", SeededChoice);
