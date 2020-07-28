
const CONSTANTS = {
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
			'divine-discount': 0.99,
			'season-savings': 0.99,
			'santas-dominion': 0.99,
			'faberge-egg': 0.99
		},
		buffs: {
			'summon-crafty-pixies': 0.98,
			'everything-must-go': 0.95
		},
		auras: {
			'fierce-hoarder': 0.02,
			'reality-bending': 0.002
		},
		spirits: {
			'dotjeiess': {
				diamond: 0.93,
				ruby: 0.95,
				jade: 0.98
			}
		},
		// plants: {
		// 	'cheapcap': 0.998
		// }
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

let IO = {
	menu: {},
	toggleMenu: () => {
		let shade = IO.menu.shade.classList;
		if (shade.contains('hidden')) {
			shade.toggle('hidden');
			window.setTimeout(function() {
				shade.toggle('open');
			}, 10);
		} else {
			shade.toggle('open');
			window.setTimeout(function() {
				shade.toggle('hidden');
			}, 300);
		}
	
		IO.menu.nav.classList.toggle('open');	
	},

	buildings: {},
	buildingVal: (bldg) => IO.buildings[bldg].el.value,

	controls: {},

	discounts: {},
	hasDiscount: (name) => IO.discounts[name].el.checked,

	settings: {}
};

/**
 * Calculate the total multiplier
 */
function getMultiplier() {
	let mult = 1;

	// upgrades stack multiplicatively
	for (let name in CONSTANTS.discounts.upgrades) {
		let discount = CONSTANTS.discounts.upgrades[name];
		if (IO.hasDiscount(name)) mult *= discount;
	}

	// buffs stack multiplicatively
	for (let name in CONSTANTS.discounts.buffs) {
		let discount = CONSTANTS.discounts.buffs[name];
		if (IO.hasDiscount(name)) mult *= discount;
	}

	// auras stack additively
	let sum = 0;
	for (let name in CONSTANTS.discounts.auras) {
		let discount = CONSTANTS.discounts.auras[name];
		if (IO.hasDiscount(name)) sum += discount;
	}
	if (sum > 0) mult *= (1 - sum);

	// spirits stack multiplicatively
	for (let name in CONSTANTS.discounts.spirits) {
		let discount = CONSTANTS.discounts.spirits[name];
		if (IO.hasDiscount(name)) {
			if (name === 'dotjeiess') {
				for (let slot in discount) {
					if (IO.discounts[name].slots[slot].checked)
					mult *= discount[slot];
				}
			} else {
				mult *= discount;
			}
		}
	}

	if (IO.controls.sellmode.checked)
		mult *= (IO.hasDiscount('earth-shatterer') ? 0.5 : 0.25);

	return mult;
}

/**
 * Calculate the price for a building based on the quantity owned and quantity being purchased
 */
function calculatePrice(bldg) {
	let price = 0,
		have = IO.buildings[bldg].in.value !== '' ? parseInt(IO.buildings[bldg].in.value) : 0,
		quantity = parseInt(IO.controls.quantity.value),
		free = (bldg==='cursor' && IO.hasDiscount('starter-kit') ? 10 : (bldg==='grandma' && IO.hasDiscount('starter-kitchen') ? 5 : 0)),
		sellMode = IO.controls.sellmode.checked,
		from = (sellMode ? have - quantity : have),
		to = (sellMode ? have : have + quantity);

	for (let i = Math.max(0, from); i < Math.max(0, to); i++)
		price += CONSTANTS.base[bldg] * Math.pow(CONSTANTS.increase, Math.max(0, i-free));

	return Math.ceil(price * getMultiplier());
}

/**
 * Format a large number
 */
function prettyNumber(n) {
	if(n >= Number.MAX_VALUE) return '<span class="infinity">∞</span>';

	let pow = 0,
	short = IO.settings['short-numbers'].checked,
	p = (short ? 3 : 15),
	step = (short ? 1000 : 10),
	pstep = (short ? 3 : 1);

	if (n < 1000000)
		return n.toLocaleString();
	
	while (n.toFixed(p) >= step) {
		n /= step;
		pow += pstep;
	}

	n = n.toFixed(p).toString();

	while (n.slice(-1) === '0')
		n = n.slice(0,-1);
	
	if (n.slice(-1) === '.')
		n = n.slice(0,-1);

	return n + (short ? ' '+CONSTANTS.suffix[pow] : "e"+pow);
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
	for(let bldg in IO.buildings) run(bldg);
}

/**
 * Store the DOM elements for the calculations
 */
function initialize() {
	// Store the nav menu and shade elements
	IO.menu['nav'] = document.querySelector('nav');
	IO.menu['shade'] = document.querySelector('.shade');

	// Store building input and output fields
	document.querySelectorAll('.buildings input').forEach(el => {
		IO.buildings[el.name] = {};
		IO.buildings[el.name]['in'] = el;
	});
	document.querySelectorAll('.buildings .output').forEach(el => {
		IO.buildings[el.id]['out'] = el;
	});

	// Store quantity and sell mode input elements
	document.querySelectorAll('.controls input').forEach(el => {
		IO.controls[el.name] = el;
	});

	// Store discount checkbox elements // TODO split this into the different discount types?
	document.querySelectorAll('.discounts input[type="checkbox"]').forEach(el => {
		IO.discounts[el.name] = {};
		if(el.name === 'dotjeiess'){
			IO.discounts[el.name].slots = {};
			document.querySelectorAll('input[name="dotjeiess-slot"]').forEach(slot => {
				IO.discounts[el.name].slots[slot.value] = slot;
			});
		}
		IO.discounts[el.name]['el'] = el;
	});

	// Store settings elements
	document.querySelectorAll('.settings input').forEach(el => {
		IO.settings[el.name] = el;
	});

	runAll();
}

/**
 * Import save data from a Cookie Clicker save string
 */
function importSave() {
	let data = prompt("Paste your save string here");

	if (data !== null && data !== '')
		parseAndImportData(data);
		
	runAll();
}

// Go!
initialize();