"use strict";

var CONSTANTS = {
  increase: 1.15,
  base: {
    'cursor': 15,
    'grandma': 100,
    'farm': 1100,
    'mine': 12000,
    'factory': 130000,
    'bank': 1400000,
    'temple': 20000000,
    'wizard-tower': 330000000,
    'shipment': 5100000000,
    'alchemy-lab': 75000000000,
    'portal': 1000000000000,
    'time-machine': 14000000000000,
    'antimatter-condenser': 170000000000000,
    'prism': 2100000000000000,
    'chancemaker': 26000000000000000,
    'fractal-engine': 310000000000000000
  },
  discounts: {
    'Divine discount': 0.99,
    'Season savings': 0.99,
    'Santa\'s dominion': 0.99,
    'Faberge egg': 0.99,
    'Summon Crafty Pixies': 0.98,
    'Fierce Hoarder': 0.98,
    'Everything must go': 0.95,
    'Dotjeiess, Spirit of Creation': {
      diamond: 0.93,
      ruby: 0.95,
      jade: 0.98
    }
  },
  suffix: {
    0: '',
    3: '',
    6: 'million',
    9: 'billion',
    12: 'trillion',
    15: 'quadrillion',
    18: 'quintillion',
    21: 'sextillion',
    24: 'septillion',
    27: 'octillion',
    30: 'nonillion',
    33: 'decillion',
    36: 'undecillion',
    39: 'duodecillion',
    42: 'tredecillion',
    45: 'quattuordecillion',
    48: 'quindecillion',
    51: 'sedecillion',
    54: 'septendecillion',
    57: 'octodecillion',
    60: 'novemdecillion',
    63: 'vigintillion',
    66: 'unvigintillion',
    69: 'duovigintillion',
    72: 'trevigintillion',
    75: 'quattuorvigintillion',
    78: 'quinvigintillion',
    81: 'sexvigintillion',
    84: 'septenvigintillion',
    87: 'octovigintillion',
    90: 'novemvigintillion',
    93: 'trigintillion',
    96: 'untrigintillion',
    99: 'duotrigintillion',
    102: 'tretrigintillion',
    105: 'quattuortrigintillion',
    108: 'quintrigintillion',
    111: 'sextrigintillion',
    114: 'septentrigintillion',
    117: 'octotrigintillion',
    120: 'novemtrigintillion',
    123: 'quadragintillion',
    126: 'unquadragintillion',
    129: 'duoquadragintillion',
    132: 'trequadragintillion',
    135: 'quattuorquadragintillion',
    138: 'quinquadragintillion',
    141: 'sexquadragintillion',
    144: 'septenquadragintillion',
    147: 'octoquadragintillion',
    150: 'novemquadragintillion',
    153: 'quinquagintillion',
    156: 'unquinquagintillion',
    159: 'duoquinquagintillion',
    162: 'trequinquagintillion',
    165: 'quattuorquinquagintillion',
    168: 'quinquinquagintillion',
    171: 'sexquinquagintillion',
    174: 'septenquinquagintillion',
    177: 'octoquinquagintillion',
    180: 'novemquinquagintillion',
    183: 'sexagintillion',
    186: 'unsexagintillion',
    189: 'duosexagintillion',
    192: 'tresexagintillion',
    195: 'quattuorsexagintillion',
    198: 'quinsexagintillion',
    201: 'sexsexagintillion',
    204: 'septensexagintillion',
    207: 'octosexagintillion',
    210: 'novemsexagintillion',
    213: 'septuagintillion',
    216: 'unseptuagintillion',
    219: 'duoseptuagintillion',
    222: 'treseptuagintillion',
    225: 'quattuorseptuagintillion',
    228: 'quinseptuagintillion',
    231: 'sexseptuagintillion',
    234: 'septenseptuagintillion',
    237: 'octoseptuagintillion',
    240: 'novemseptuagintillion',
    243: 'octogintillion',
    246: 'unoctogintillion',
    249: 'duooctogintillion',
    252: 'treoctogintillion',
    255: 'quattuoroctogintillion',
    258: 'quinoctogintillion',
    261: 'sexoctogintillion',
    264: 'septenoctogintillion',
    267: 'octooctogintillion',
    270: 'novemoctogintillion',
    273: 'nonagintillion',
    276: 'unnonagintillion',
    279: 'duononagintillion',
    282: 'trenonagintillion',
    285: 'quattuornonagintillion',
    288: 'quinnonagintillion',
    291: 'sexnonagintillion',
    294: 'septennonagintillion',
    297: 'octononagintillion',
    300: 'novemnonagintillion',
    303: 'centillion',
    306: 'watdafrigginheckillion'
  }
};
var IO = {
  menu: {},
  buildings: {},
  options: {},
  controls: {}
};

function toggleMenu() {
  var scrn = IO.menu.screen.classList;

  if (scrn.contains('hidden')) {
    scrn.toggle('hidden');
    window.setTimeout(function () {
      scrn.toggle('open');
    }, 10);
  } else {
    scrn.toggle('open');
    window.setTimeout(function () {
      scrn.toggle('hidden');
    }, 300);
  }

  IO.menu.nav.classList.toggle('open');
}

function getMultiplier() {
  var factor = 1;

  for (var i in CONSTANTS.discounts) {
    var discount = CONSTANTS.discounts[i];

    if (IO.options[i].elem.checked) {
      if (i === 'Dotjeiess, Spirit of Creation') {
        for (var j in discount) {
          if (IO.options[i].slots[j].checked) factor *= discount[j];
        }
      } else {
        factor *= discount;
      }
    }
  }

  if (IO.controls.mode.checked) factor *= IO.options['Earth Shatterer'].elem.checked ? 0.5 : 0.25;
  return factor;
}

function calculatePrice(bldg) {
  var price = 0,
      have = IO.buildings[bldg].elem.value !== '' ? parseInt(IO.buildings[bldg].elem.value) : 0,
      quantity = parseInt(IO.controls.quantity.value),
      free = bldg === 'cursor' && IO.options['Starter kit'].elem.checked ? 10 : bldg === 'grandma' && IO.options['Starter kitchen'].elem.checked ? 5 : 0,
      sellMode = IO.controls.mode.checked,
      from = sellMode ? have - quantity : have,
      to = sellMode ? have : have + quantity;

  for (var i = Math.max(0, from); i < Math.max(0, to); i++) {
    price += CONSTANTS.base[bldg] * Math.pow(CONSTANTS.increase, Math.max(0, i - free));
  }

  return Math.ceil(price * getMultiplier());
}

function prettyNumber(n) {
  if (n >= Number.MAX_VALUE) return '<span class="infinity">∞</span>';
  var pow = 0,
      short = IO.options['Short numbers'].elem.checked,
      p = short ? 3 : 15,
      step = short ? 1000 : 10,
      pstep = short ? 3 : 1;
  if (n < 1000000) return n.toLocaleString();

  while (n.toFixed(p) >= step) {
    n /= step;
    pow += pstep;
  }

  n = n.toFixed(p).toString();

  while (n.slice(-1) === '0') {
    n = n.slice(0, -1);
  }

  if (n.slice(-1) === '.') n = n.slice(0, -1);
  return n + (short ? ' ' + CONSTANTS.suffix[pow] : "e" + pow);
}

function run() {
  for (var i in IO.buildings) {
    IO.buildings[i].output.innerHTML = prettyNumber(calculatePrice(i));
  }
}

function initialize() {
  IO.menu['nav'] = document.querySelector('nav');
  IO.menu['screen'] = document.querySelector('.screen');
  document.querySelectorAll('.buildings input').forEach(function (el) {
    IO.buildings[el.name] = {};
    IO.buildings[el.name]['elem'] = el;
  });
  document.querySelectorAll('.buildings .output').forEach(function (el) {
    IO.buildings[el.id]['output'] = el;
  });
  document.querySelectorAll('.options input[type="checkbox"]').forEach(function (el) {
    IO.options[el.name] = {};

    if (el.name === 'Dotjeiess, Spirit of Creation') {
      IO.options[el.name].slots = {};
      document.querySelectorAll('input[name="dotjeiess-slot"]').forEach(function (slot) {
        IO.options[el.name].slots[slot.value] = slot;
      });
    }

    IO.options[el.name]['elem'] = el;
  });
  document.querySelectorAll('.controls input').forEach(function (el) {
    IO.controls[el.name] = el;
  });
  run();
}

initialize();