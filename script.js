const DOM = {
  toggleBtn: document.getElementById("toggleMode"),
  toggleIcon: document.getElementById("toggleIcon"),
  body: document.body,
  starsDiv: document.getElementById("stars"),
};

const NIGHT_MODE_KEY = "nightMode";
const STAR_COUNT = 20;
const STAR_PULSE_RANGE = { min: 1.5, max: 3.5 };
const STAR_SIZE_RANGE = { min: 2, max: 5 };
const STAR_OPACITY_RANGE = { min: 0.1, max: 1 };
const STAR_DELAY_MAX = 2;

const randomInRange = (min, max) => min + Math.random() * (max - min);

let isNight = localStorage.getItem(NIGHT_MODE_KEY) === "true";

function setNight(night) {
  isNight = night;
  DOM.body.classList.toggle("night", night);
  localStorage.setItem(NIGHT_MODE_KEY, String(night));
  DOM.toggleIcon.className = night ? "fas fa-sun" : "fas fa-moon";
  night ? animateStars() : (DOM.starsDiv.innerHTML = "");
}

setNight(isNight);

DOM.toggleBtn.addEventListener("click", () => setNight(!isNight));

function createStar() {
  const dot = document.createElement("div");
  const size = randomInRange(STAR_SIZE_RANGE.min, STAR_SIZE_RANGE.max);
  const duration = randomInRange(STAR_PULSE_RANGE.min, STAR_PULSE_RANGE.max);
  const opacity = randomInRange(STAR_OPACITY_RANGE.min, STAR_OPACITY_RANGE.max);

  dot.className = "star";
  dot.style.left = Math.random() * 100 + "%";
  dot.style.top = Math.random() * 100 + "%";
  dot.style.width = size + "px";
  dot.style.height = size + "px";
  dot.style.opacity = opacity;
  dot.style.animation = `star-pulse ${duration}s infinite ease-in-out`;
  dot.style.animationDelay = randomInRange(0, STAR_DELAY_MAX) + "s";
  return dot;
}

function animateStars() {
  if (DOM.starsDiv.children.length > 0) return;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < STAR_COUNT; i++) {
    fragment.appendChild(createStar());
  }
  DOM.starsDiv.appendChild(fragment);
}

function resetScroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("load", resetScroll);
window.addEventListener("resize", resetScroll, { passive: true });
