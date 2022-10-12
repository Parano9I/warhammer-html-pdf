const CompanionTemplate = require("./FighterTemplate.js");
const rulesParcer  = require("../../helpers/parse/rulesParcer.js");
const getImgNameByKey = require("../../helpers/getImgNameByKey.js");

module.exports = (data) => {
    const factionData = data.querySelector('.force>h2').text;
    const factionName = /\(([^}]*)\)/.exec(factionData)[1];
    const factionPTS = /\[([^}]*)\]/.exec(factionData)[1];

    const heroData = data.querySelectorAll('.force>ul>.category');

    const heroMainData = heroData[0].querySelector('.rootselection>h4').text;
    const heroName = heroMainData.replace(/\[[^}]*\]/, '').trim();
    const heroPTS = /\[([^}]*)\]/.exec(heroMainData)[1];

    const fightersData = heroData[1].querySelectorAll('.rootselection');

    const summary = data.querySelectorAll('.summary');

    const forceRules = summary[1].querySelectorAll('p');
    const selectionRules = summary[2].querySelectorAll('p');

    return {
        factionName,
        factionImg: getImgNameByKey('Soulblight Gravelords') ?? '',
        factionPTS,
        heroName,
        heroImg: getImgNameByKey(heroName) ?? '',
        heroPTS,
        champions:  fightersData.map(fighterData => CompanionTemplate(fighterData)),
        forceRules: rulesParcer(forceRules),
        selectionRules: rulesParcer(selectionRules),
    }
}