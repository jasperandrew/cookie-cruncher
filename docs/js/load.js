"use strict";

function load(data) {
  var str; // Decode save string

  try {
    str = decodeURIComponent(escape(Base64.decode(unescape(data).split('!END!')[0])));
  } catch (e) {
    console.log(e);
    return false;
  }

  str = str.split('|'); // Get version

  var version = parseFloat(str[0]);
  console.log(version); // Get buildings

  var buildings = str[5].split(';');
  var inputs = document.querySelectorAll('.buildings input');
  inputs.forEach(function (input) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    input.value = buildings[i++].split(',')[0];
  }); // Get upgrades

  var upgrades = {
    divine: 285,
    season: 160,
    santas: 168,
    faberge: 223,
    kit: 288,
    kitchen: 289
  };

  for (var i in upgrades) {
    document.querySelector('input[name="' + i + '"]').checked = parseInt(str[6][upgrades[i] * 2 + 1]);
  } // Get dragon aura


  var auras = str[4].split(';').slice(36, 38);
  IO.settings.upgrades.shatterer.checked = 0;
  IO.settings.discounts.fierce.elem.checked = 0;
  auras.forEach(function (aura) {
    if (aura === '5') IO.settings.upgrades.shatterer.checked = 1;
    if (aura === '7') IO.settings.discounts.fierce.elem.checked = 1;
  }); // Get grimoire buff
}

var LoadSave = function LoadSave(data) {
  var str = '';
  if (data) str = unescape(data);else {
    if (Game.useLocalStorage) {
      var local = Game.localStorageGet(Game.SaveTo);

      if (!local) //no localstorage save found? let's get the cookie one last time
        {
          if (document.cookie.indexOf(Game.SaveTo) >= 0) {
            str = unescape(document.cookie.split(Game.SaveTo + '=')[1]);
            document.cookie = Game.SaveTo + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          } else return false;
        } else {
        str = unescape(local);
      }
    } else //legacy system
      {
        if (document.cookie.indexOf(Game.SaveTo) >= 0) str = unescape(document.cookie.split(Game.SaveTo + '=')[1]); //get cookie here
        else return false;
      }
  }

  if (str != '') {
    var version = 0;
    var oldstr = str.split('|');

    if (oldstr[0] < 1) {} else {
      str = str.split('!END!')[0];
      str = b64_to_utf8(str);
    }

    if (str != '') {
      var spl = '';
      str = str.split('|');
      version = parseFloat(str[0]);

      if (isNaN(version) || str.length < 5) {
        if (Game.prefs.popups) Game.Popup('Oops, looks like the import string is all wrong!');else Game.Notify('Error importing save', 'Oops, looks like the import string is all wrong!', '', 6, 1);
        return false;
      }

      if (version >= 1 && version > Game.version) {
        if (Game.prefs.popups) Game.Popup('Error : you are attempting to load a save from a future version (v. ' + version + '; you are using v. ' + Game.version + ').');else Game.Notify('Error importing save', 'You are attempting to load a save from a future version (v. ' + version + '; you are using v. ' + Game.version + ').', '', 6, 1);
        return false;
      }

      if (version == 1.0501) //prompt if we loaded from the 2014 beta
        {
          setTimeout(function () {
            Game.Prompt('<h3>New beta</h3><div class="block">Hey there! Unfortunately, your old beta save won\'t work here anymore; you\'ll have to start fresh or import your save from the live version.<div class="line"></div>Thank you for beta-testing Cookie Clicker, we hope you\'ll enjoy it and find strange and interesting bugs!</div>', [['Alright then!', 'Game.ClosePrompt();']]);
          }, 200);
          return false;
        } else if (version < 1.0501) //prompt if we loaded from the 2014 live version
        {
          setTimeout(function () {
            Game.Prompt('<h3>Update</h3><div class="block"><b>Hey there!</b> Cookie Clicker just received a pretty substantial update, and you might notice that some things have been moved around. Don\'t panic!<div class="line"></div>Your building numbers may look strange, making it seem like you own buildings you\'ve never bought; this is because we\'ve added <b>3 new buildings</b> after factories (and swapped mines and factories), offsetting everything after them. Likewise, some building-related upgrades and achievements may look a tad shuffled around. This is all perfectly normal!<div class="line"></div>We\'ve also rebalanced Heavenly Chips amounts and behavior. Your amount of chips might be lower or higher than before.<br>You can now ascend through the <b>Legacy button</b> at the top!<div class="line"></div>Thank you for playing Cookie Clicker. We\'ve put a lot of work and care into this update and we hope you\'ll enjoy it!</div>', [['Neat!', 'Game.ClosePrompt();']]);
          }, 200);
        }

      if (version >= 1) {
        Game.T = 0;
        spl = str[2].split(';'); //save stats

        Game.startDate = parseInt(spl[0]);
        Game.fullDate = parseInt(spl[1]);
        Game.lastDate = parseInt(spl[2]);
        Game.bakeryName = spl[3] ? spl[3] : Game.GetBakeryName();
        Game.seed = spl[4] ? spl[4] : Game.makeSeed(); //prefs

        if (version < 1.0503) spl = str[3].split('');else if (version < 2.0046) spl = unpack2(str[3]).split('');else spl = str[3].split('');
        Game.prefs.particles = parseInt(spl[0]);
        Game.prefs.numbers = parseInt(spl[1]);
        Game.prefs.autosave = parseInt(spl[2]);
        Game.prefs.autoupdate = spl[3] ? parseInt(spl[3]) : 1;
        Game.prefs.milk = spl[4] ? parseInt(spl[4]) : 1;
        Game.prefs.fancy = parseInt(spl[5]);
        if (Game.prefs.fancy) Game.removeClass('noFancy');else if (!Game.prefs.fancy) Game.addClass('noFancy');
        Game.prefs.warn = spl[6] ? parseInt(spl[6]) : 0;
        Game.prefs.cursors = spl[7] ? parseInt(spl[7]) : 0;
        Game.prefs.focus = spl[8] ? parseInt(spl[8]) : 0;
        Game.prefs.format = spl[9] ? parseInt(spl[9]) : 0;
        Game.prefs.notifs = spl[10] ? parseInt(spl[10]) : 0;
        Game.prefs.wobbly = spl[11] ? parseInt(spl[11]) : 0;
        Game.prefs.monospace = spl[12] ? parseInt(spl[12]) : 0;
        Game.prefs.filters = parseInt(spl[13]);
        if (Game.prefs.filters) Game.removeClass('noFilters');else if (!Game.prefs.filters) Game.addClass('noFilters');
        Game.prefs.cookiesound = spl[14] ? parseInt(spl[14]) : 1;
        Game.prefs.crates = spl[15] ? parseInt(spl[15]) : 0;
        Game.prefs.showBackupWarning = spl[16] ? parseInt(spl[16]) : 1;
        Game.prefs.extraButtons = spl[17] ? parseInt(spl[17]) : 1;
        if (!Game.prefs.extraButtons) Game.removeClass('extraButtons');else if (Game.prefs.extraButtons) Game.addClass('extraButtons');
        Game.prefs.askLumps = spl[18] ? parseInt(spl[18]) : 0;
        BeautifyAll();
        spl = str[4].split(';'); //cookies and lots of other stuff

        Game.cookies = parseFloat(spl[0]);
        Game.cookiesEarned = parseFloat(spl[1]);
        Game.cookieClicks = spl[2] ? parseInt(spl[2]) : 0;
        Game.goldenClicks = spl[3] ? parseInt(spl[3]) : 0;
        Game.handmadeCookies = spl[4] ? parseFloat(spl[4]) : 0;
        Game.missedGoldenClicks = spl[5] ? parseInt(spl[5]) : 0;
        Game.bgType = spl[6] ? parseInt(spl[6]) : 0;
        Game.milkType = spl[7] ? parseInt(spl[7]) : 0;
        Game.cookiesReset = spl[8] ? parseFloat(spl[8]) : 0;
        Game.elderWrath = spl[9] ? parseInt(spl[9]) : 0;
        Game.pledges = spl[10] ? parseInt(spl[10]) : 0;
        Game.pledgeT = spl[11] ? parseInt(spl[11]) : 0;
        Game.nextResearch = spl[12] ? parseInt(spl[12]) : 0;
        Game.researchT = spl[13] ? parseInt(spl[13]) : 0;
        Game.resets = spl[14] ? parseInt(spl[14]) : 0;
        Game.goldenClicksLocal = spl[15] ? parseInt(spl[15]) : 0;
        Game.cookiesSucked = spl[16] ? parseFloat(spl[16]) : 0;
        Game.wrinklersPopped = spl[17] ? parseInt(spl[17]) : 0;
        Game.santaLevel = spl[18] ? parseInt(spl[18]) : 0;
        Game.reindeerClicked = spl[19] ? parseInt(spl[19]) : 0;
        Game.seasonT = spl[20] ? parseInt(spl[20]) : 0;
        Game.seasonUses = spl[21] ? parseInt(spl[21]) : 0;
        Game.season = spl[22] ? spl[22] : Game.baseSeason;
        var wrinklers = {
          amount: spl[23] ? parseFloat(spl[23]) : 0,
          number: spl[24] ? parseInt(spl[24]) : 0
        };
        Game.prestige = spl[25] ? parseFloat(spl[25]) : 0;
        Game.heavenlyChips = spl[26] ? parseFloat(spl[26]) : 0;
        Game.heavenlyChipsSpent = spl[27] ? parseFloat(spl[27]) : 0;
        Game.heavenlyCookies = spl[28] ? parseFloat(spl[28]) : 0;
        Game.ascensionMode = spl[29] ? parseInt(spl[29]) : 0;
        Game.permanentUpgrades[0] = spl[30] ? parseInt(spl[30]) : -1;
        Game.permanentUpgrades[1] = spl[31] ? parseInt(spl[31]) : -1;
        Game.permanentUpgrades[2] = spl[32] ? parseInt(spl[32]) : -1;
        Game.permanentUpgrades[3] = spl[33] ? parseInt(spl[33]) : -1;
        Game.permanentUpgrades[4] = spl[34] ? parseInt(spl[34]) : -1; //if (version<1.05) {Game.heavenlyChipsEarned=Game.HowMuchPrestige(Game.cookiesReset);Game.heavenlyChips=Game.heavenlyChipsEarned;}

        Game.dragonLevel = spl[35] ? parseInt(spl[35]) : 0;

        if (version < 2.0041 && Game.dragonLevel == Game.dragonLevels.length - 2) {
          Game.dragonLevel = Game.dragonLevels.length - 1;
        }

        Game.dragonAura = spl[36] ? parseInt(spl[36]) : 0;
        Game.dragonAura2 = spl[37] ? parseInt(spl[37]) : 0;
        Game.chimeType = spl[38] ? parseInt(spl[38]) : 0;
        Game.volume = spl[39] ? parseInt(spl[39]) : 50;
        wrinklers.shinies = spl[40] ? parseInt(spl[40]) : 0;
        wrinklers.amountShinies = spl[41] ? parseFloat(spl[41]) : 0;
        Game.lumps = spl[42] ? parseFloat(spl[42]) : -1;
        Game.lumpsTotal = spl[43] ? parseFloat(spl[43]) : -1;
        Game.lumpT = spl[44] ? parseInt(spl[44]) : Date.now();
        Game.lumpRefill = spl[45] ? parseInt(spl[45]) : 0;
        Game.lumpCurrentType = spl[46] ? parseInt(spl[46]) : 0;
        Game.vault = spl[47] ? spl[47].split(',') : [];

        for (var i in Game.vault) {
          Game.vault[i] = parseInt(Game.vault[i]);
        }

        spl = str[5].split(';'); //buildings

        Game.BuildingsOwned = 0;

        for (var i in Game.ObjectsById) {
          var me = Game.ObjectsById[i];
          me.switchMinigame(false);

          if (spl[i]) {
            var mestr = spl[i].toString().split(',');
            me.amount = parseInt(mestr[0]);
            me.bought = parseInt(mestr[1]);
            me.totalCookies = parseFloat(mestr[2]);
            me.level = parseInt(mestr[3] || 0);

            if (me.minigame && me.minigameLoaded && me.minigame.reset) {
              me.minigame.reset(true);
              me.minigame.load(mestr[4] || '');
            } else me.minigameSave = mestr[4] || 0;

            me.muted = parseInt(mestr[5]) || 0;
            Game.BuildingsOwned += me.amount;
            if (version < 2.003) me.level = 0;
          } else {
            me.amount = 0;
            me.unlocked = 0;
            me.bought = 0;
            me.totalCookies = 0;
            me.level = 0;
          }
        }

        Game.LoadMinigames();

        if (version < 1.035) //old non-binary algorithm
          {
            spl = str[6].split(';'); //upgrades

            Game.UpgradesOwned = 0;

            for (var i in Game.UpgradesById) {
              var me = Game.UpgradesById[i];

              if (spl[i]) {
                var mestr = spl[i].split(',');
                me.unlocked = parseInt(mestr[0]);
                me.bought = parseInt(mestr[1]);
                if (me.bought && Game.CountsAsUpgradeOwned(me.pool)) Game.UpgradesOwned++;
              } else {
                me.unlocked = 0;
                me.bought = 0;
              }
            }

            if (str[7]) spl = str[7].split(';');else spl = []; //achievements

            Game.AchievementsOwned = 0;

            for (var i in Game.AchievementsById) {
              var me = Game.AchievementsById[i];

              if (spl[i]) {
                var mestr = spl[i].split(',');
                me.won = parseInt(mestr[0]);
              } else {
                me.won = 0;
              }

              if (me.won && Game.CountsAsAchievementOwned(me.pool)) Game.AchievementsOwned++;
            }
          } else if (version < 1.0502) //old awful packing system
          {
            if (str[6]) spl = str[6];else spl = []; //upgrades

            if (version < 1.05) spl = UncompressLargeBin(spl);else spl = unpack(spl);
            Game.UpgradesOwned = 0;

            for (var i in Game.UpgradesById) {
              var me = Game.UpgradesById[i];

              if (spl[i * 2]) {
                var mestr = [spl[i * 2], spl[i * 2 + 1]];
                me.unlocked = parseInt(mestr[0]);
                me.bought = parseInt(mestr[1]);
                if (me.bought && Game.CountsAsUpgradeOwned(me.pool)) Game.UpgradesOwned++;
              } else {
                me.unlocked = 0;
                me.bought = 0;
              }
            }

            if (str[7]) spl = str[7];else spl = []; //achievements

            if (version < 1.05) spl = UncompressLargeBin(spl);else spl = unpack(spl);
            Game.AchievementsOwned = 0;

            for (var i in Game.AchievementsById) {
              var me = Game.AchievementsById[i];

              if (spl[i]) {
                var mestr = [spl[i]];
                me.won = parseInt(mestr[0]);
              } else {
                me.won = 0;
              }

              if (me.won && Game.CountsAsAchievementOwned(me.pool)) Game.AchievementsOwned++;
            }
          } else {
          if (str[6]) spl = str[6];else spl = []; //upgrades

          if (version < 2.0046) spl = unpack2(spl).split('');else spl = spl.split('');
          Game.UpgradesOwned = 0;

          for (var i in Game.UpgradesById) {
            var me = Game.UpgradesById[i];

            if (spl[i * 2]) {
              var mestr = [spl[i * 2], spl[i * 2 + 1]];
              me.unlocked = parseInt(mestr[0]);
              me.bought = parseInt(mestr[1]);
              if (me.bought && Game.CountsAsUpgradeOwned(me.pool)) Game.UpgradesOwned++;
            } else {
              me.unlocked = 0;
              me.bought = 0;
            }
          }

          if (str[7]) spl = str[7];else spl = []; //achievements

          if (version < 2.0046) spl = unpack2(spl).split('');else spl = spl.split('');
          Game.AchievementsOwned = 0;

          for (var i in Game.AchievementsById) {
            var me = Game.AchievementsById[i];

            if (spl[i]) {
              var mestr = [spl[i]];
              me.won = parseInt(mestr[0]);
            } else {
              me.won = 0;
            }

            if (me.won && Game.CountsAsAchievementOwned(me.pool)) Game.AchievementsOwned++;
          }
        }

        Game.killBuffs();
        var buffsToLoad = [];
        spl = (str[8] || '').split(';'); //buffs

        for (var i in spl) {
          if (spl[i]) {
            var mestr = spl[i].toString().split(',');
            buffsToLoad.push(mestr);
          }
        }

        for (var i in Game.ObjectsById) {
          var me = Game.ObjectsById[i];
          if (me.buyFunction) me.buyFunction();
          me.refresh();

          if (me.id > 0) {
            if (me.muted) me.mute(1);
          }
        }

        if (version < 1.0503) //upgrades that used to be regular, but are now heavenly
          {
            var me = Game.Upgrades['Persistent memory'];
            me.unlocked = 0;
            me.bought = 0;
            var me = Game.Upgrades['Season switcher'];
            me.unlocked = 0;
            me.bought = 0;
          }

        if (Game.bgType == -1) Game.bgType = 0;
        if (Game.milkType == -1) Game.milkType = 0; //advance timers

        var framesElapsed = Math.ceil((Date.now() - Game.lastDate) / 1000 * Game.fps);
        if (Game.pledgeT > 0) Game.pledgeT = Math.max(Game.pledgeT - framesElapsed, 1);
        if (Game.seasonT > 0) Game.seasonT = Math.max(Game.seasonT - framesElapsed, 1);
        if (Game.researchT > 0) Game.researchT = Math.max(Game.researchT - framesElapsed, 1);
        Game.ResetWrinklers();
        Game.LoadWrinklers(wrinklers.amount, wrinklers.number, wrinklers.shinies, wrinklers.amountShinies); //recompute season trigger prices

        if (Game.Has('Season switcher')) {
          for (var i in Game.seasons) {
            Game.Unlock(Game.seasons[i].trigger);
          }
        }

        Game.computeSeasonPrices(); //recompute prestige

        Game.prestige = Math.floor(Game.HowMuchPrestige(Game.cookiesReset)); //if ((Game.heavenlyChips+Game.heavenlyChipsSpent)<Game.prestige)
        //{Game.heavenlyChips=Game.prestige;Game.heavenlyChipsSpent=0;}//chips owned and spent don't add up to total prestige? set chips owned to prestige

        if (version == 1.037 && Game.beta) //are we opening the new beta? if so, save the old beta to /betadungeons
          {
            window.localStorage.setItem('CookieClickerGameBetaDungeons', window.localStorage.getItem('CookieClickerGameBeta'));
            Game.Notify('Beta save data', 'Your beta save data has been safely exported to /betadungeons.', 20);
          } else if (version == 1.0501 && Game.beta) //are we opening the newer beta? if so, save the old beta to /oldbeta
          {
            window.localStorage.setItem('CookieClickerGameOld', window.localStorage.getItem('CookieClickerGameBeta')); //Game.Notify('Beta save data','Your beta save data has been safely exported to /oldbeta.',20);
          }

        if (version <= 1.0466 && !Game.beta) //export the old 2014 version to /v10466
          {
            window.localStorage.setItem('CookieClickerGamev10466', window.localStorage.getItem('CookieClickerGame')); //Game.Notify('Beta save data','Your save data has been safely exported to /v10466.',20);
          }

        if (version == 1.9) //are we importing from the 1.9 beta? remove all heavenly upgrades and refund heavenly chips
          {
            for (var i in Game.UpgradesById) {
              var me = Game.UpgradesById[i];

              if (me.bought && me.pool == 'prestige') {
                me.unlocked = 0;
                me.bought = 0;
              }
            }

            Game.heavenlyChips = Game.prestige;
            Game.heavenlyChipsSpent = 0;
            setTimeout(function () {
              Game.Prompt('<h3>Beta patch</h3><div class="block">We\'ve tweaked some things and fixed some others, please check the update notes!<div class="line"></div>Of note : due to changes in prestige balancing, all your heavenly upgrades have been removed and your heavenly chips refunded; you\'ll be able to reallocate them next time you ascend.<div class="line"></div>Thank you again for beta-testing Cookie Clicker!</div>', [['Alright then!', 'Game.ClosePrompt();']]);
            }, 200);
          }

        if (version <= 1.0466) //are we loading from the old live version? reset HCs
          {
            Game.heavenlyChips = Game.prestige;
            Game.heavenlyChipsSpent = 0;
          }

        if (Game.ascensionMode != 1) {
          if (Game.Has('Starter kit')) Game.Objects['Cursor'].free = 10;
          if (Game.Has('Starter kitchen')) Game.Objects['Grandma'].free = 5;
        }

        Game.CalculateGains();
        if (Math.random() < 1 / 10000) Game.TOYS = 1; //teehee!

        var timeOffline = (Date.now() - Game.lastDate) / 1000;
        Game.loadLumps(timeOffline); //compute cookies earned while the game was closed

        if (Game.mobile || Game.Has('Perfect idling') || Game.Has('Twin Gates of Transcendence')) {
          if (Game.Has('Perfect idling')) {
            var maxTime = 60 * 60 * 24 * 1000000000;
            var percent = 100;
          } else {
            var maxTime = 60 * 60;
            if (Game.Has('Belphegor')) maxTime *= 2;
            if (Game.Has('Mammon')) maxTime *= 2;
            if (Game.Has('Abaddon')) maxTime *= 2;
            if (Game.Has('Satan')) maxTime *= 2;
            if (Game.Has('Asmodeus')) maxTime *= 2;
            if (Game.Has('Beelzebub')) maxTime *= 2;
            if (Game.Has('Lucifer')) maxTime *= 2;
            var percent = 5;
            if (Game.Has('Angels')) percent += 10;
            if (Game.Has('Archangels')) percent += 10;
            if (Game.Has('Virtues')) percent += 10;
            if (Game.Has('Dominions')) percent += 10;
            if (Game.Has('Cherubim')) percent += 10;
            if (Game.Has('Seraphim')) percent += 10;
            if (Game.Has('God')) percent += 10;

            if (Game.Has('Chimera')) {
              maxTime += 60 * 60 * 24 * 2;
              percent += 5;
            }

            if (Game.Has('Fern tea')) percent += 3;
            if (Game.Has('Ichor syrup')) percent += 7;
          }

          var timeOfflineOptimal = Math.min(timeOffline, maxTime);
          var timeOfflineReduced = Math.max(0, timeOffline - timeOfflineOptimal);
          var amount = (timeOfflineOptimal + timeOfflineReduced * 0.1) * Game.cookiesPs * (percent / 100);

          if (amount > 0) {
            if (Game.prefs.popups) Game.Popup('Earned ' + Beautify(amount) + ' cookie' + (Math.floor(amount) == 1 ? '' : 's') + ' while you were away');else Game.Notify('Welcome back!', 'You earned <b>' + Beautify(amount) + '</b> cookie' + (Math.floor(amount) == 1 ? '' : 's') + ' while you were away.<br>(' + Game.sayTime(timeOfflineOptimal * Game.fps, -1) + ' at ' + Math.floor(percent) + '% CpS' + (timeOfflineReduced ? ', plus ' + Game.sayTime(timeOfflineReduced * Game.fps, -1) + ' at ' + Math.floor(percent * 10) / 100 + '%' : '') + '.)', [Math.floor(Math.random() * 16), 11]);
            Game.Earn(amount);
          }
        } //we load buffs after everything as we do not want them to interfer with offline CpS


        for (var i in buffsToLoad) {
          var mestr = buffsToLoad[i];
          var type = Game.buffTypes[parseInt(mestr[0])];
          Game.gainBuff(type.name, parseFloat(mestr[1]) / Game.fps, parseFloat(mestr[3] || 0), parseFloat(mestr[4] || 0), parseFloat(mestr[5] || 0)).time = parseFloat(mestr[2]);
        }

        Game.bakeryNameRefresh();
      } else //importing old version save
        {
          Game.Notify('Error importing save', 'Sorry, you can\'t import saves from the old version anymore.', '', 6, 1);
          return false;
        }

      Game.RebuildUpgrades();
      Game.TickerAge = 0;
      Game.elderWrathD = 0;
      Game.recalculateGains = 1;
      Game.storeToRefresh = 1;
      Game.upgradesToRebuild = 1;
      Game.buyBulk = 1;
      Game.buyMode = 1;
      Game.storeBulkButton(-1);
      Game.specialTab = '';
      Game.ToggleSpecialMenu(0);
      Game.killShimmers();

      if (Game.T > Game.fps * 5 && Game.ReincarnateTimer == 0) //fade out of black and pop the cookie
        {
          Game.ReincarnateTimer = 1;
          Game.addClass('reincarnating');
          Game.BigCookieSize = 0;
        }

      if (version < Game.version) l('logButton').classList.add('hasUpdate');

      if (Game.season != '' && Game.season == Game.baseSeason) {
        if (Game.season == 'valentines') Game.Notify('Valentine\'s Day!', 'It\'s <b>Valentine\'s season</b>!<br>Love\'s in the air and cookies are just that much sweeter!', [20, 3], 60 * 3);else if (Game.season == 'fools') Game.Notify('Business Day!', 'It\'s <b>Business season</b>!<br>Don\'t panic! Things are gonna be looking a little more corporate for a few days.', [17, 6], 60 * 3);else if (Game.season == 'halloween') Game.Notify('Halloween!', 'It\'s <b>Halloween season</b>!<br>Everything is just a little bit spookier!', [13, 8], 60 * 3);else if (Game.season == 'christmas') Game.Notify('Christmas time!', 'It\'s <b>Christmas season</b>!<br>Bring good cheer to all and you just may get cookies in your stockings!', [12, 10], 60 * 3);else if (Game.season == 'easter') Game.Notify('Easter!', 'It\'s <b>Easter season</b>!<br>Keep an eye out and you just might click a rabbit or two!', [0, 12], 60 * 3);
      }

      if (Game.prefs.popups) Game.Popup('Game loaded');else Game.Notify('Game loaded', '', '', 1, 1);
      if (Game.prefs.showBackupWarning == 1) Game.showBackupWarning();
    }
  } else return false;

  return true;
};