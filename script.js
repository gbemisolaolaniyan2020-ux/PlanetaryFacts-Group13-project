const themeButton = document.querySelector(".theme-icon");
const themeLabel = themeButton.querySelector(".theme-label");

themeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");

    themeLabel.textContent = isDark ? "Light" : "Dark";
    themeButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeButton.setAttribute("aria-pressed", String(isDark));
});