"use strict";

function toggleClass(targets, name) {
  targets.forEach(function (target) {
    document.querySelector(target).classList.toggle(name);
  });
}