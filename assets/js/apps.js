import {
  nextThemePreference,
  normalizeThemePreference,
  resolveTheme,
  themeControlCopy,
} from "./theme.js";

const STORAGE_KEY = "raad.theme";
const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const themeText = document.querySelector("#theme-label");
const menuButton = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function safeReadPreference() {
  try {
    return normalizeThemePreference(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return "system";
  }
}

function safeWritePreference(preference) {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, preference);
    }
  } catch {
    // Storage can be unavailable in privacy-restricted contexts.
  }
}

let preference = safeReadPreference();

function renderTheme() {
  const resolved = resolveTheme(preference, systemTheme.matches);
  const copy = themeControlCopy(preference);

  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolved;

  themeButton.setAttribute("aria-label", copy.label);
  themeButton.setAttribute("title", copy.label);
  themeText.textContent = copy.text;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.content = resolved === "dark" ? "#111714" : "#f1eee7";
  }
}

themeButton.addEventListener("click", () => {
  preference = nextThemePreference(preference);
  safeWritePreference(preference);
  renderTheme();
});

systemTheme.addEventListener("change", () => {
  if (preference === "system") renderTheme();
});

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation.dataset.open = String(!open);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.dataset.open = "false";
  }
});

renderTheme();
