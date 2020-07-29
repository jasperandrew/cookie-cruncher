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
    'fractal-engine': 310000000000000000,
    'javascript-console': 71000000000000000000
  },
  discounts: {
    upgrades: {
      'divine-discount': 0.01,
      'season-savings': 0.01,
      'santas-dominion': 0.01,
      'faberge-egg': 0.01
    },
    fortunes: {
      '100': 0.01,
      buildings: [0.07, {
        'cursor': '001',
        'grandma': '002',
        'farm': '003',
        'mine': '004',
        'factory': '005',
        'bank': '006',
        'temple': '007',
        'wizard-tower': '008',
        'shipment': '009',
        'alchemy-lab': '010',
        'portal': '011',
        'time-machine': '012',
        'antimatter-condenser': '013',
        'prism': '014',
        'chancemaker': '015',
        'fractal-engine': '016',
        'javascript-console': '017'
      }]
    },
    buffs: {
      'summon-crafty-pixies': 0.02,
      'everything-must-go': 0.05
    },
    auras: {
      'earth-shatterer': 0.5,
      'fierce-hoarder': 0.02,
      'reality-bending': 0.002
    },
    spirits: {
      'dotjeiess': {
        diamond: 0.07,
        ruby: 0.05,
        jade: 0.02
      }
    },
    plants: {
      'cheapcap': 0.002
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
    51: 'sexdecillion',
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
  toggleMenu: function toggleMenu() {
    var shade = IO.menu.shade.classList;

    if (shade.contains('hidden')) {
      shade.toggle('hidden');
      window.setTimeout(function () {
        shade.toggle('open');
      }, 10);
    } else {
      shade.toggle('open');
      window.setTimeout(function () {
        shade.toggle('hidden');
      }, 300);
    }

    IO.menu.nav.classList.toggle('open');
  },
  buildings: {},
  buildingVal: function buildingVal(bldg) {
    return bldg in IO.buildings ? IO.buildings[bldg].el.value : null;
  },
  controls: {},
  discounts: {},
  hasDiscount: function hasDiscount(name) {
    return name in IO.discounts && IO.discounts[name].el.checked;
  },
  settings: {}
};
/**
 * Calculate the total multiplier
 */

function getMultiplier(bldg) {
  var mult = 1; // upgrades stack multiplicatively

  for (var name in CONSTANTS.discounts.upgrades) {
    var discount = CONSTANTS.discounts.upgrades[name];
    if (IO.hasDiscount(name)) mult *= 1 - discount;
  } // fortunes are for individual buildings, mostly


  for (var _name in CONSTANTS.discounts.fortunes) {
    var _discount = CONSTANTS.discounts.fortunes[_name],
        num = _name;

    if (_name === "buildings") {
      num = _discount[1][bldg];
      _discount = _discount[0];
    }

    if (IO.hasDiscount('fortune-' + num)) {
      console.log(num);
      mult *= 1 - _discount;
    }
  } // buffs stack multiplicatively


  for (var _name2 in CONSTANTS.discounts.buffs) {
    var _discount2 = CONSTANTS.discounts.buffs[_name2];
    if (IO.hasDiscount(_name2)) mult *= 1 - _discount2;
  } // auras stack additively


  var sum = 0;

  for (var _name3 in CONSTANTS.discounts.auras) {
    var _discount3 = CONSTANTS.discounts.auras[_name3];
    if (IO.hasDiscount(_name3)) sum += _discount3;
  }

  if (sum > 0) mult *= 1 - sum; // spirits stack multiplicatively

  for (var _name4 in CONSTANTS.discounts.spirits) {
    var _discount4 = CONSTANTS.discounts.spirits[_name4];

    if (IO.hasDiscount(_name4)) {
      if (_name4 === 'dotjeiess') {
        for (var slot in _discount4) {
          if (IO.discounts[_name4].slots[slot].checked) mult *= 1 - _discount4[slot];
        }
      } else {
        mult *= 1 - _discount4;
      }
    }
  } // sell mode calculations


  if (IO.controls.sellmode.checked) {
    var _discount5 = CONSTANTS.discounts.auras['earth-shatterer'];
    mult *= IO.hasDiscount('earth-shatterer') ? _discount5 : 0.25;
  }

  return mult;
}
/**
 * Calculate the price for a building based on the quantity owned and quantity being purchased
 */


function calculatePrice(bldg) {
  var price = 0,
      have = IO.buildings[bldg].in.value !== '' ? parseInt(IO.buildings[bldg].in.value) : 0,
      quantity = parseInt(IO.controls.quantity.value),
      free = bldg === 'cursor' && IO.hasDiscount('starter-kit') ? 10 : bldg === 'grandma' && IO.hasDiscount('starter-kitchen') ? 5 : 0,
      sellMode = IO.controls.sellmode.checked,
      from = sellMode ? have - quantity : have,
      to = sellMode ? have : have + quantity;

  for (var i = Math.max(0, from); i < Math.max(0, to); i++) {
    price += CONSTANTS.base[bldg] * Math.pow(CONSTANTS.increase, Math.max(0, i - free));
  }

  return Math.ceil(price * getMultiplier(bldg));
}
/**
 * Format a large number
 */


function prettyNumber(n) {
  if (n >= Number.MAX_VALUE) return '<span class="infinity">∞</span>';
  var pow = 0,
      short = IO.settings['short-numbers'].checked,
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
/**
 * Run the calculations for a building
 */


function run(bldg) {
  IO.buildings[bldg].out.innerHTML = prettyNumber(calculatePrice(bldg));
}
/**
 * Run the calculations for all the buildings
 */


function runAll() {
  for (var bldg in IO.buildings) {
    run(bldg);
  }
}
/**
 * Store the DOM elements for the calculations
 */


function initialize() {
  // Store the nav menu and shade elements
  IO.menu['nav'] = document.querySelector('nav#menu');
  IO.menu['shade'] = document.querySelector('#shade'); // Store building input and output fields

  document.querySelectorAll('#buildings input').forEach(function (el) {
    IO.buildings[el.name] = {};
    IO.buildings[el.name]['in'] = el;
  });
  document.querySelectorAll('#buildings .output').forEach(function (el) {
    IO.buildings[el.id]['out'] = el;
  }); // Store quantity and sell mode input elements

  document.querySelectorAll('#controls input').forEach(function (el) {
    IO.controls[el.name] = el;
  }); // Store discount checkbox elements // TODO split this into the different discount types?

  document.querySelectorAll('#discounts input[type="checkbox"]').forEach(function (el) {
    IO.discounts[el.name] = {};

    if (el.name === 'dotjeiess') {
      IO.discounts[el.name].slots = {};
      document.querySelectorAll('input[name="dotjeiess-slot"]').forEach(function (slot) {
        IO.discounts[el.name].slots[slot.value] = slot;
      });
    }

    IO.discounts[el.name]['el'] = el;
  }); // Store settings elements

  document.querySelectorAll('#settings input').forEach(function (el) {
    IO.settings[el.name] = el;
  });
  runAll();
}
/**
 * Import save data from a Cookie Clicker save string
 */


function importSave() {
  var data = prompt("Paste your save string here");
  if (data !== null && data !== '') parseAndImportData(data);
  runAll();
} // Go!


initialize();