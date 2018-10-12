"use strict";

function toggleMenu() {
  var screen = document.querySelector('.screen');

  if (screen.classList.contains('hidden')) {
    screen.classList.toggle('hidden');
    window.setTimeout(function () {
      screen.classList.toggle('open');
    }, 10);
  } else {
    screen.classList.toggle('open');
    window.setTimeout(function () {
      screen.classList.toggle('hidden');
    }, 300);
  }

  document.querySelector('.menu').classList.toggle('open');
  document.querySelector('.button').classList.toggle('open');
}