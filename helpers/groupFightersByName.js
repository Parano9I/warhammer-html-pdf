const CompanionTemplate = require('../Templates/JSON/FighterTemplate')

module.exports = (fighters) => {
  const fightersObject = fighters.map(fighterData => CompanionTemplate(fighterData))

  return fightersObject.reduce((prev, curr) => {
    const indexMatchFighter = prev.findIndex((fighter) => fighter.name === curr.name)

    if(indexMatchFighter !== -1){
      const fighter = prev[indexMatchFighter]
      fighter.repeats += 1

      return prev
    } else {
      return prev = [
        ...prev,
        curr
      ]
    }

  }, [])
}