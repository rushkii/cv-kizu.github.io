// ambil semua element by id yang diperlukan aja.
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const themeLabel = document.getElementById("themeLabel");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const spoiler = document.getElementById("spoiler");

// untuk keperluan gallery slider
const main = new Splide("#main-slider", {
  type: "fade",
  heightRatio: 0.53,
  pagination: false,
  arrows: true,
  cover: true,
  autoplay: true,
  interval: 5000,
  pauseOnHover: true,
  pauseOnFocus: true,
  rewind: true,
  autoplay: true,
});

// untuk keperluan gallery slider
const thumbnails = new Splide("#thumbnail-slider", {
  rewind: true,
  fixedWidth: 104,
  fixedHeight: 58,
  isNavigation: true,
  gap: 10,
  focus: "center",
  pagination: false,
  arrows: false,
  cover: true,
  dragMinThreshold: {
    mouse: 4,
    touch: 10,
  },
  breakpoints: {
    640: {
      fixedWidth: 66,
      fixedHeight: 38,
    },
  },
});

// handle transisi className
const transitionClassName = (ms, element, ...classNames) => {
  setTimeout(() => {
    element.classList.add(...classNames);
    setTimeout(() => element.classList.remove(...classNames), ms + 500);
  }, ms);
};

// untuk handle theme changer
const setTheme = (dark) => {
  if (dark) {
    html.classList.add("dark");
    document.body.classList.add("dark");
    if (themeLabel) themeLabel.textContent = "Dark";
    if (sunIcon) sunIcon.classList.add("hidden");
    if (moonIcon) moonIcon.classList.remove("hidden");
  } else {
    html.classList.remove("dark");
    document.body.classList.remove("dark");
    if (themeLabel) themeLabel.textContent = "Light";
    if (sunIcon) sunIcon.classList.remove("hidden");
    if (moonIcon) moonIcon.classList.add("hidden");
  }
  localStorage.setItem("theme", dark ? "dark" : "light");
};

const saved = localStorage.getItem("theme");

if (
  saved === "dark" ||
  (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  setTheme(true);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(!html.classList.contains("dark"));
  });
}

if (themeToggleMobile) {
  themeToggleMobile.addEventListener("click", () => {
    setTheme(!html.classList.contains("dark"));
  });
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  });
}

// untuk remove spoiler mark
if (spoiler) {
  spoiler.addEventListener("click", () => {
    const overlay = spoiler.querySelector("div");
    if (overlay) {
      overlay.classList.remove(
        "backdrop-blur-3xl",
        "bg-white/80",
        "dark:bg-neutral-950/80",
      );
      const elements = spoiler.querySelectorAll("div");
      elements[1].remove();
    }
  });
}

document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  });
});

/**
 * untuk handle header navigation.
 * jadi ketika navigation diklik maka akan trigger smooth scroll jump.
*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href").slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "center" });

    transitionClassName(
      500,
      target,
      "scale-[1.015]",
      "bg-blue-100/30",
      "dark:bg-blue-800/30",
    );
  });
});

window.addEventListener("load", () => {
  if (window.location.hash) {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }

  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();
});
