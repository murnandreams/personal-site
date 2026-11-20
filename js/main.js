/*
 * Page behaviour: mobile menu, scroll reveals and the copy-email button.
 * Loaded with `defer`. Everything degrades gracefully without JS.
 */
(function () {
  "use strict";

  /* Mobile menu ----------------------------------------------------------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") === "true" &&
          !nav.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    // Close when switching to the desktop layout.
    var desktop = window.matchMedia("(min-width: 48rem)");
    var onDesktop = function () { if (desktop.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);
  }

  /* Scroll reveals -------------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    for (var i = 0; i < reveals.length; i++) reveals[i].classList.add("is-visible");
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    for (var j = 0; j < reveals.length; j++) observer.observe(reveals[j]);
  }

  // Never leave content hidden when printing.
  window.addEventListener("beforeprint", function () {
    for (var k = 0; k < reveals.length; k++) reveals[k].classList.add("is-visible");
  });

  /* Copy email button ----------------------------------------------------- */
  var copyButtons = document.querySelectorAll("[data-copy]");

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok ? Promise.resolve() : Promise.reject();
  }

  Array.prototype.forEach.call(copyButtons, function (button) {
    var status = document.getElementById(button.getAttribute("aria-describedby") || "");
    var label = button.querySelector("[data-copy-label]");
    var original = label ? label.textContent : "";
    var timer;

    button.hidden = false;
    button.addEventListener("click", function () {
      var text = button.getAttribute("data-copy");
      var attempt = navigator.clipboard && window.isSecureContext
        ? navigator.clipboard.writeText(text)
        : fallbackCopy(text);

      attempt.then(function () {
        if (label) label.textContent = "Copied";
        if (status) status.textContent = "Email address copied to clipboard.";
      }, function () {
        if (status) status.textContent = "Copy failed. Please select the address and copy it manually.";
      }).then(function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (label) label.textContent = original;
          if (status) status.textContent = "";
        }, 2500);
      });
    });
  });

  /* Form validation states ------------------------------------------------ */
  var fields = document.querySelectorAll(".field");
  Array.prototype.forEach.call(fields, function (field) {
    var input = field.querySelector(".input");
    if (!input) return;
    var touch = function () { field.classList.add("is-touched"); };
    input.addEventListener("blur", function () { if (input.value !== "") touch(); });
    input.addEventListener("invalid", touch);
    input.addEventListener("input", function () {
      if (field.classList.contains("is-touched")) {
        input.setAttribute("aria-invalid", input.validity.valid ? "false" : "true");
      }
    });
    input.addEventListener("invalid", function () { input.setAttribute("aria-invalid", "true"); });
    input.addEventListener("blur", function () {
      if (field.classList.contains("is-touched")) {
        input.setAttribute("aria-invalid", input.validity.valid ? "false" : "true");
      }
    });
  });
})();
