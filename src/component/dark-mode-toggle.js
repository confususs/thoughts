class DarkModeToggle extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
      <label class="toggle" for="dark-mode-checkbox">
        <input type="checkbox" id="dark-mode-checkbox">
        Dark Mode
      </label>
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const checkbox = this.shadowRoot.getElementById("dark-mode-checkbox");
    checkbox.addEventListener("change", DarkModeToggle.toggleDarkMode);

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      checkbox.checked = true;
      DarkModeToggle.toggleDarkMode({ target: checkbox });
    }
  }

  static toggleDarkMode(event) {
    const checkbox = event.target;
    const body = document.querySelector("body");

    if (checkbox.checked) {
      body.style.setProperty("--bg-color", "black");
      body.style.setProperty("--text-color", "white");
    } else {
      body.style.setProperty("--bg-color", "white");
      body.style.setProperty("--text-color", "black");
    }
  }
}

customElements.define("c-dark-mode-toggle", DarkModeToggle);
