/////////////////////////////
// STATE
/////////////////////////////

const state = {
  filter: "all",
  projects: [
    {
      title: "Task Manager",
      description: "LocalStorage task app with filtering.",
      tags: ["JavaScript"]
    },
    {
      title: "Weather App",
      description: "Live weather using OpenWeather API.",
      tags: ["API"]
    },
    {
      title: "UI System",
      description: "Reusable CSS + layout system.",
      tags: ["CSS"]
    }
  ]
};

/////////////////////////////
// DOM
/////////////////////////////

const grid = document.querySelector(".grid");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

/////////////////////////////
// THEME
/////////////////////////////

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme(state.theme);
}

applyTheme(state.theme);

/////////////////////////////
// RENDER PROJECTS
/////////////////////////////

function renderProjects() {
  grid.innerHTML = "";

  const filtered =
    state.filter === "all"
      ? state.projects
      : state.projects.filter(p => p.tags.includes(state.filter));

  filtered.forEach(project => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <small>${project.tags.join(", ")}</small>
    `;

    grid.appendChild(card);
  });
}

renderProjects();

/////////////////////////////
// FILTER
/////////////////////////////

function setFilter(tag) {
  state.filter = tag;
  renderProjects();
}

/////////////////////////////
// CTA BUTTON
/////////////////////////////

document.getElementById("ctaBtn").addEventListener("click", () => {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////
// FORM VALIDATION
/////////////////////////////

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = e.target.querySelectorAll("input, textarea");

  for (let input of inputs) {
    if (!input.value.trim()) {
      alert("Please fill all fields");
      return;
    }
  }

  alert("Message sent!");
  e.target.reset();
});

/////////////////////////////
// NAV ACTIVE STATE (IntersectionObserver)
/////////////////////////////

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;

      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${id}`
        );
      });
    }
  });
}, { threshold: 0.6 });

sections.forEach(sec => observer.observe(sec));

/////////////////////////////
// NAV SMOOTH SCROLL
/////////////////////////////

document.querySelector(".nav").addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-link")) {
    e.preventDefault();

    const id = e.target.getAttribute("href").replace("#", "");
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }
});