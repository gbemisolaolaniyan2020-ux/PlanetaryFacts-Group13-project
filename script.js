const themeButton = document.querySelector(".theme-icon");
const themeLabel = themeButton.querySelector(".theme-label");

themeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");

    themeLabel.textContent = isDark ? "Light" : "Dark";
    themeButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeButton.setAttribute("aria-pressed", String(isDark));
});

const themeToggle = document.querySelector("#theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");

        if (isDarkMode) {
            themeToggle.textContent = "☀️ Switch to Light Mode";
        } else {
            themeToggle.textContent = "🌙 Switch to Dark Mode";
        }

        themeToggle.setAttribute(
            "aria-pressed",
            String(isDarkMode)
        );
    });
}
const API_URL = "https://anurella.github.io/json/planet.json";

const root = document.documentElement;
