const API_URL = "https://anurella.github.io/json/planet.json";

const searchForm = document.querySelector("#planet-search-form");
const searchInput = document.querySelector("#planet-search");
const statusEl = document.querySelector("#search-status");
const searchErrorEl = document.querySelector("#search-error");

const cardEl = document.querySelector(".planet-overview");
const noResultsEl = document.querySelector("#no-results");
const factsEl = document.querySelector(".facts-section");

const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
const themeIconImg = document.querySelector("#theme-icon-img");

let planets = [];


function applyTheme(theme) {
  root.dataset.theme = theme;

  const isDark = theme === "dark";
  themeLabel.textContent = isDark ? "LIGHT" : "DARK";
  themeIconImg.src = isDark ? "assets/icons/theme Icon (2).svg" : "assets/icons/theme Icon.svg";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  if (themeIconImg) {
    themeIconImg.src = isDark ? "assets/icons/theme Icon (2).svg" : "assets/icons/theme Icon.svg";
  }
}

function loadSavedTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (error) {
    
  }
  applyTheme(saved === "dark" ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);

  try {
    localStorage.setItem("theme", next);
  } catch (error) {
    
  }
});

function setStatus(message) {
  statusEl.textContent = message;
}

function showCard() {
  noResultsEl.hidden = true;
  searchErrorEl.hidden = true;
  cardEl.style.display = "";
  factsEl.hidden = false;
}

function showNoResults() {
  noResultsEl.hidden = false;
  searchErrorEl.hidden = false;
  cardEl.style.display = "none";
  factsEl.hidden = true;
}


function renderPlanetCard(planet) {
    const img = document.querySelector("#planet-image");

      img.onerror = () => {
      img.onerror = null;         
      img.src = planet.image;      
      };
    img.src = `assets/images/planet ${planet.name.toLowerCase()} round.jpg`;
    img.alt = planet.name;

    document.querySelector("#planet-name").textContent = planet.name;
    document.querySelector("#planet-category").textContent = planet.type;
    document.querySelector("#planet-description").textContent = planet.description;

    document.querySelector("#planet-gravity").textContent = planet.gravity;
    document.querySelector("#planet-mass").textContent = planet.mass;
    document.querySelector("#planet-period").textContent = planet.period;

    document.querySelector("#planet-temperature").textContent = planet.temperature;
    document.querySelector("#planet-moons").textContent = planet.moons;
    document.querySelector("#planet-diameter").textContent = planet.diameter;
    document.querySelector("#planet-rotation").textContent = planet.distanceFromSun;

}

function renderTable() {
  const rows = document.querySelectorAll("#planet-table-body tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");   
    const planet = planets.find(
      (p) => p.name === cells[0].textContent.trim()
    );
    if (!planet) return;

    cells[1].textContent = planet.mass;
    cells[2].textContent = planet.diameter.toLocaleString("en-US");
  });
}

async function loadPlanets() {
  try {
    setStatus("Loading planets...");
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    planets = await response.json();
    setStatus("");

    const earth = planets.find((p) => p.name === "Earth");
    renderPlanetCard(earth || planets[0]);
    renderTable();
  } catch (error) {
    console.error(error);
    setStatus("Could not load planet data. Check your connection and refresh.");
  }
}


searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim().toLowerCase();

  if (!query || planets.length === 0) {
    showNoResults();
    return;
  }

  const match = planets.find((p) => p.name.toLowerCase() === query);

  if (match) {
    renderPlanetCard(match);
    showCard();
  } else {
    showNoResults();
  }
});


loadSavedTheme();
loadPlanets();
