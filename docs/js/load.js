"use strict";

function load(data) {
  // Decode save string
  var str;

  try {
    str = decodeURIComponent(escape(Base64.decode(unescape(data).split('!END!')[0])));
  } catch (e) {
    alert(e + '\n ');
    return false;
  }

  str = str.split('|'); // Get version

  var version = parseFloat(str[0]);

  if (version < 2.012) {
    alert("That save file is from an old version of the game. Please update to the latest version before exporting the save string.\n");
    return false;
  } // Get buildings


  var buildings = str[5].split(';'),
      i = 0;

  for (var bldg in IO.buildings) {
    IO.buildings[bldg].elem.value = buildings[i++].split(',')[0];
  } // Get upgrades


  var upgrades = {
    'Season savings': 160,
    'Santa\'s dominion': 168,
    'Faberge egg': 223,
    'Divine discount': 285,
    'Starter kit': 288,
    'Starter kitchen': 289
  };

  for (var _i in upgrades) {
    IO.options[_i].elem.checked = parseInt(str[6][upgrades[_i] * 2 + 1]);
  } // Get dragon auras


  var auras = str[4].split(';').slice(36, 38);
  IO.options['Earth Shatterer'].elem.checked = 0;
  IO.options['Fierce Hoarder'].elem.checked = 0;
  auras.forEach(function (aura) {
    if (aura === '5') IO.options['Earth shatterer'].elem.checked = 1;
    if (aura === '7') IO.options['Fierce hoarder'].elem.checked = 1;
  }); // Get spirit aura

  var dotj = buildings[6].split(',')[4].split(' ')[0].split('/'),
      slot = dotj[0] === '5' ? 'diamond' : dotj[1] === '5' ? 'ruby' : dotj[2] === '5' ? 'jade' : null;
  IO.options['Dotjeiess, Spirit of Creation'].elem.checked = 0;

  if (slot) {
    IO.options['Dotjeiess, Spirit of Creation'].elem.checked = 1;
    IO.options['Dotjeiess, Spirit of Creation'].slots[slot].checked = 1;
  }
}

function loadPrompt() {
  var data = prompt("Paste your save string here");
  if (data !== null && data !== '') load(data);
}