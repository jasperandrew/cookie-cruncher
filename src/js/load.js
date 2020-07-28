/**
 * Parse a Cookie Clicker save string and store the relevant information
 */
function parseAndImportData(data) {
    // Decode save string
    let str;
    try {
        str = decodeURIComponent(escape(Base64.decode(unescape(data).split('!END!')[0])));
    } catch(e) {
        alert(e + '\n ');
        return false;
    }
    str = str.split('|');
    console.log(str);
    // Get version
    let version = parseFloat(str[0]);
    if (version < 2.012) {
        alert("That save file is from an old version of the game. Please update to the latest version before exporting the save string.\n");
        return false;
    }

    // Get buildings
    let buildings = str[5].split(';'),
        i = 0;
    for (let bldg in IO.buildings) {
        IO.buildings[bldg].in.value = buildings[i++].split(',')[0];
    }

    // Get upgrades
    let upgrades = {
        'season-savings':160,
        'santas-dominion':168,
        'faberge-egg':223,
        'divine-discount':285,
        'starter-kit':288,
        'starter-kitchen':289
    };
    for (let u in upgrades) {
        IO.discounts[u].el.checked = parseInt(str[6][upgrades[u]*2 + 1]);
    }

    // Get dragon auras
    let auras = str[4].split(';').slice(36,38);
    IO.discounts['earth-shatterer'].el.checked = 0;
    IO.discounts['fierce-hoarder'].el.checked = 0;
    auras.forEach(aura => {
        if (aura === '5')
            IO.discounts['earth-shatterer'].el.checked = 1;
        if (aura === '7')
            IO.discounts['fierce-hoarder'].el.checked = 1;
    });

    // Get spirit aura
    let dotj = buildings[6].split(',')[4].split(' ')[0].split('/'),
        slot = (dotj[0] === '5' ? 'diamond' : (dotj[1] === '5' ? 'ruby' : (dotj[2] === '5' ? 'jade' : null)));
    IO.discounts['dotjeiess'].el.checked = 0;
    if (slot) {
        IO.discounts['dotjeiess'].el.checked = 1;
        IO.discounts['dotjeiess'].slots[slot].checked = 1;
    }
}