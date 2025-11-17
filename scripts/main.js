// Navegación móvil
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Cerrar menú al hacer clic en un enlace (en móvil)
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Modo oscuro / claro
const toggleThemeBtn = document.getElementById("toggleTheme");
const body = document.body;

const THEME_KEY = "portfolio-theme";

function setTheme(theme) {
  if (theme === "light") {
    body.classList.add("light");
  } else {
    body.classList.remove("light");
  }
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    setTheme(saved);
  } else {
    // Detectar preferencia del sistema
    const prefersLight = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }
}

toggleThemeBtn.addEventListener("click", () => {
  const isLight = body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

initTheme();

// Año dinámico en el footer
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

// Filtro de proyectos
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "all" || filter === category) {
        card.style.display = "block";
        card.style.opacity = 1;
      } else {
        card.style.opacity = 0;
        setTimeout(() => {
          card.style.display = "none";
        }, 200);
      }
    });
  });
});

// Mensaje simple en el formulario (sin backend)
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Aquí normalmente enviarías los datos a tu backend o a un servicio
  const name = document.getElementById("name").value.trim();

  formMsg.textContent = `Gracias, ${name || "🚀"} 👋. Tu mensaje ha sido enviado.`;
  formMsg.style.color = "#22c55e";

  contactForm.reset();

  setTimeout(() => {
    formMsg.textContent = "";
  }, 4000);
});
