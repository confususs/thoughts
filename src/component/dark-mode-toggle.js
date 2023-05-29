class DarkModeToggle extends HTMLElement {
  connectedCallback() {
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
      body.style.setProperty("--bg-color", "#1e1e20");
      body.style.setProperty("--text-color", "rgba(255, 255, 245, .86)");
      body.style.setProperty("--link-color", "#F299FF");
      body.style.setProperty("--link-visited-color", "#F299FF");
    } else {
      body.style.setProperty("--bg-color", "white");
      body.style.setProperty("--text-color", "rgba(60, 60, 67)");
      body.style.setProperty("--link-color", "#0000EE");
      body.style.setProperty("--link-visited-color", "#551A8B");
    }
  }
}

customElements.define("c-dark-mode-toggle", DarkModeToggle);
