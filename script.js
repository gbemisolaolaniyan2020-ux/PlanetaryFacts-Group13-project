
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