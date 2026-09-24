export const THEME_PREFERENCES = Object.freeze(["system", "light", "dark"]);

export function normalizeThemePreference(value) {
  return THEME_PREFERENCES.includes(value) ? value : "system";
}

export function resolveTheme(preference, systemPrefersDark) {
  const normalized = normalizeThemePreference(preference);

  if (normalized === "system") {
    return systemPrefersDark ? "dark" : "light";
  }

  return normalized;
}

export function nextThemePreference(preference) {
  const normalized = normalizeThemePreference(preference);
  const index = THEME_PREFERENCES.indexOf(normalized);
  return THEME_PREFERENCES[(index + 1) % THEME_PREFERENCES.length];
}

export function themeControlCopy(preference) {
  const normalized = normalizeThemePreference(preference);
  const next = nextThemePreference(normalized);

  return {
    label: `Theme: ${normalized}. Switch to ${next}.`,
    text: normalized === "system" ? "System" : normalized[0].toUpperCase() + normalized.slice(1),
  };
}
