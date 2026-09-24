import test from "node:test";
import assert from "node:assert/strict";

import {
  nextThemePreference,
  normalizeThemePreference,
  resolveTheme,
  themeControlCopy,
} from "../assets/js/theme.js";

test("normalizes unknown preferences to system", () => {
  assert.equal(normalizeThemePreference("sepia"), "system");
  assert.equal(normalizeThemePreference(null), "system");
  assert.equal(normalizeThemePreference("dark"), "dark");
});

test("resolves system preference from OS state", () => {
  assert.equal(resolveTheme("system", true), "dark");
  assert.equal(resolveTheme("system", false), "light");
});

test("explicit preferences override system state", () => {
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme("dark", false), "dark");
});

test("theme preference cycles system, light, dark", () => {
  assert.equal(nextThemePreference("system"), "light");
  assert.equal(nextThemePreference("light"), "dark");
  assert.equal(nextThemePreference("dark"), "system");
});

test("control copy announces current and next preference", () => {
  assert.deepEqual(themeControlCopy("dark"), {
    label: "Theme: dark. Switch to system.",
    text: "Dark",
  });
});
