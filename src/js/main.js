function toggleMenu() {
	var screen = document.querySelector('.screen');

	if(screen.classList.contains('hidden')){
		screen.classList.toggle('hidden');
		window.setTimeout(function(){
			screen.classList.toggle('open');
		}, 10);
	}else{
		screen.classList.toggle('open');
		window.setTimeout(function(){
			screen.classList.toggle('hidden');
		}, 300);
	}

	document.querySelector('nav').classList.toggle('open');
}

const BASE = {
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
}
const SUFFIXES = {
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
const BUFFS = {
	divine: 0.99,
	season: 0.99,
	santas: 0.99,
	faberge: 0.99,
	summon: 0.98,
	fierce: 0.98,
	everything: 0.95,
	dotjeiess: {
		diamond: 0.93,
		ruby: 0.95,
		jade: 0.98
	}
}

function isChecked(name) {
	return document.querySelector('input[name=' + name + ']').checked;
}
function inputValue(name) {
	return document.querySelector('input[name=' + name + ']').value;
}

function multiplier() {
	var factor = 1;
	if(!isChecked('mode')){ // sell mode
		document.querySelectorAll('.buffs input[type="checkbox"]').forEach(btn => {
			if(btn.checked){
				if(!(btn.value === 'dotjeiess')){
					factor *= BUFFS[btn.value];
				}else{
					document.querySelectorAll('input[name="dotjeiess-lvl"]').forEach(btn => {
						if(btn.checked){
							factor *= BUFFS.dotjeiess[btn.value];
						}
					});
				}
			}
		});
	}else{ // buy mode
		factor = 0.25;
		if(isChecked('earth')) factor = 0.5;
	}
	return factor;
}

function buy(bldg) {
	var cost = 0,
		have = parseInt(inputValue(bldg)),
		tobuy = parseInt(inputValue('quantity')),
		want = have + tobuy;

	function formula(a, b) { return (Math.pow(1.15, a) - Math.pow(1.15, b)) / 0.15; }

	if((bldg==='cursor' && isChecked('kit')) || (bldg==='grandma' && isChecked('kitchen'))){
		var free = (bldg === 'cursor'? 10 : 5);
		if(have >= free){
			cost = formula(want-free, have-free);
		}else{
			cost = (want >= free ? (free-have + formula(buy-free+have, 0)) : tobuy);
		}
	}else{
		cost = formula(want, have);
	}
	return Math.ceil(cost * BASE[bldg] * multiplier());
}

function run() {

}