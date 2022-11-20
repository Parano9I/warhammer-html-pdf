const CompanionTemplate = require('./FighterTemplate.js')
const HeroTemplate = require('./HeroTemplate.js')
const getImgNameByKey = require('../../helpers/getImgNameByKey.js')
const getPTSFromStr = require('../../helpers/getPTSFromStr.js')
const getNameFromStr = require('../../helpers/getNameFromStr.js')
const getRulesGroup = require('../../helpers/parse/getRulesGroup.js')
const groupFightersByName = require('../../helpers/groupFightersByName.js')
const calculateRulesTextSizeByTextCounts = require('../../helpers/calculateRulesTextSizeByTextCounts.js')

module.exports = (data) => {
  const factionData = data.querySelector('.force>h2').text
  const factionName = getNameFromStr(factionData)
  const factionPTS = getPTSFromStr(factionData)
  const removedRaceFromTitle = factionName.split(' - ').at(-1).trim()

  const personsNode = data.querySelectorAll('.category')
  const heroesNode = personsNode[0].querySelectorAll('.rootselection')

  const leaderNode = heroesNode[0]
  const commonHeroesNode = heroesNode.slice(1) ?? []

  const fightersData = personsNode[1].querySelectorAll('.rootselection')

  const summaries = data.querySelectorAll('.summary')

  const forceRules = getRulesGroup('Force Rules', summaries)
  const selectionRules = getRulesGroup('Selection Rules', summaries)

  return {
    factionName,
    factionImg: getImgNameByKey(removedRaceFromTitle) ?? '',
    removedRaceFromTitle,
    factionPTS,
    leader: HeroTemplate(leaderNode),
    commonHeroes: commonHeroesNode.map(item => HeroTemplate(item)),
    champions: groupFightersByName(fightersData),
    forceRules,
    selectionRules,
    ruleContainerFontSize: calculateRulesTextSizeByTextCounts(selectionRules, 13)
  }
}