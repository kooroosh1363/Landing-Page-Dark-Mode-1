import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("theme control is a labelled button", () => {
  assert.match(html, /id="theme-toggle"[^>]*type="button"/);
  assert.match(html, /id="theme-label"/);
});

test("navigation targets real page sections", () => {
  for (const id of ["features", "approach", "contact"]) {
    assert.match(html, new RegExp(`href=["']#${id}["']`));
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
});

test("page has no third-party runtime dependencies", () => {
  assert.doesNotMatch(
    html,
    /unpkg\.com|fonts\.googleapis\.com|cdnjs|jsdelivr|ionicons/i,
  );
});

test("application script is loaded as a module", () => {
  assert.match(
    html,
    /<script[^>]+type="module"[^>]+src="\.\/assets\/js\/apps\.js"/,
  );
});
