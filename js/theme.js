/*
 * Theme handling. Loaded synchronously in <head> (before the stylesheet paints)
 * so the stored or system theme is applied before first render, with no flash.
 *
 * - An explicit choice is stored in localStorage under "theme" ("light" | "dark").
 * - Without a stored choice the system preference (prefers-color-scheme) is used
 *   and followed live if it changes.
 * - Adds the "js" class to <html> so CSS can enable JS-only behaviour.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  root.classList.add("js");

  function getStored() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function systemTheme() {
    return media && media.matches ? "dark" : "light";
  }

  function updateMeta(theme) {
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#1a1a1a" : "#faf9f7");
  }

  function updateToggles(theme) {
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      var dark = theme === "dark";
      buttons[i].setAttribute("aria-pressed", dark ? "true" : "false");
      buttons[i].setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      buttons[i].setAttribute("title", dark ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    updateMeta(theme);
    updateToggles(theme);
  }

  // Apply immediately (runs in <head>).
  apply(getStored() || systemTheme());

  if (media) {
    var onChange = function () {
      if (!getStored()) apply(systemTheme());
    };
    if (media.addEventListener) media.addEventListener("change", onChange);
    else if (media.addListener) media.addListener(onChange);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var current = root.getAttribute("data-theme");
    updateMeta(current);
    updateToggles(current);

    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch (e) {
          /* storage unavailable: theme still changes for this page */
        }
        apply(next);
      });
    }
  });
})();
