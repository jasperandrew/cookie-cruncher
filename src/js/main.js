
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
		'chancemaker': 26000000000000000	
	},
	suffix: {
		0: 'n/a',
		3: 'n/a',
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

let IO = {
	menu: {},
	buildings: {},
	settings: {
		discounts: {
			divine: { x: 0.99 },
			season: { x: 0.99 },
			santas: { x: 0.99 },
			faberge: { x: 0.99 },
			summon: { x: 0.98 },
			fierce: { x: 0.98 },
			everything: { x: 0.95 },
			dotjeiess: {
				opts: {
					diamond: { x: 0.93 },
					ruby: { x: 0.95},
					jade: { x: 0.98 }	
				}
			}
		},
		upgrades: {},
		controls: {}
	}
};

function toggleMenu() {
	let scrn = IO.menu.screen.classList;
	if(scrn.contains('hidden')){
		scrn.toggle('hidden');
		window.setTimeout(function(){
			scrn.toggle('open');
		}, 10);
	}else{
		scrn.toggle('open');
		window.setTimeout(function(){
			scrn.toggle('hidden');
		}, 300);
	}

	IO.menu.nav.classList.toggle('open');
}

function getMultiplier() {
	let factor = 1;

	for(let i in IO.settings.discounts){
		let buff = IO.settings.discounts[i];
		if(buff.in.checked){
			if(!(buff.in.name === 'dotjeiess')){
				factor *= buff.x;
			}else{
				for(let j in buff.opts){
					let opt = buff.opts[j];
					if(opt.in.checked) factor *= opt.x;
				}
			}
		}
	}

	if(IO.settings.controls.mode.checked)
		factor *= (IO.settings.upgrades.shatterer.checked ? 0.5 : 0.25);

	return factor;
}

function calculatePrice(bldg) {
	let price = 0,
		have = parseInt(IO.buildings[bldg].in.value),
		quantity = parseInt(IO.settings.controls.quantity.value),
		free = (bldg==='cursor' && IO.settings.upgrades.kit.checked ? 10 : (bldg==='grandma' && IO.settings.upgrades.kitchen.checked ? 5 : 0)),
		sellMode = IO.settings.controls.mode.checked,
		from = (sellMode ? have - quantity : have),
		to = (sellMode ? have : have + quantity);

	for(let i = Math.max(0, from); i < Math.max(0, to); i++)
		price += CONSTANTS.base[bldg] * Math.pow(CONSTANTS.increase, Math.max(0, i-free));

	return Math.ceil(price * getMultiplier());
}

function prettyNumber(n) {
	let pow = 0,
	short = IO.settings.controls.numbers.checked,
	p = (short ? 3 : 15),
	step = (short ? 1000 : 10),
	pstep = (short ? 3 : 1);

	if(n < 1000000) return n.toLocaleString();
	while(n.toFixed(p) >= step){
		n /= step;
		pow += pstep;
	}

	n = n.toFixed(p).toString();
	while(n.slice(-1) === '0') n = n.slice(0,-1);
	if(n.slice(-1) === '.') n = n.slice(0,-1);

	return n + (short ? ' '+CONSTANTS.suffix[pow] : "e"+pow);
}

function run() {
	for(let i in IO.buildings)
		IO.buildings[i].out.innerHTML = prettyNumber(calculatePrice(i));
}

function initialize() {
	IO.menu['nav'] = document.querySelector('nav');
	IO.menu['screen'] = document.querySelector('.screen');
	document.querySelectorAll('.buildings input').forEach(el => {
		IO.buildings[el.name] = {};
		IO.buildings[el.name]['in'] = el;
	});
	document.querySelectorAll('.buildings .output').forEach(el => {
		IO.buildings[el.id]['out'] = el;
	});
	document.querySelectorAll('.discounts input[type="checkbox"]').forEach(el => {
		if(el.name === 'dotjeiess'){
			document.querySelectorAll('input[name="dotjeiess-lvl"]').forEach(opt => {
				IO.settings.discounts[el.name].opts[opt.value]['in'] = opt;
			});
		}
		IO.settings.discounts[el.name]['in'] = el;
	});
	document.querySelectorAll('.upgrades input').forEach(el => {
		IO.settings.upgrades[el.name] = el;
	});
	document.querySelectorAll('.controls input').forEach(el => {
		IO.settings.controls[el.name] = el;
	});
	run();
}

initialize();

