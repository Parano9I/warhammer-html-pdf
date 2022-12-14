const RuleTemplate = require('../../Templates/JSON/RuleTemplate.js')

module.exports = (rules) => {

  if(!rules) return []

  // const regExpGroup = /\- [^}]*\ -|\[-[^}]*\-]/;
  const regExpGroup = /\[-(.*?)\-]|\- (.*?)\ -/

  const ruleItems = rules.querySelectorAll('p')

  let result = {}
  let group = []
  let groupName = ''

  ruleItems.forEach(rule => {
    const ruleText = rule.text.trim()

    if (ruleText.match(regExpGroup)) {
      if (groupName !== '') {
        result[groupName] = group
        group = []
        groupName = ''
      }
      groupName = regExpGroup.exec(ruleText)[0]
        .replace(/(-)|(\[)|(\])/g, '')
        .trim()

    } else {

      group.push(RuleTemplate(rule))

    }
  })

  if (Object.keys(result).length === 0) {
    result = group
  }

  result[groupName] = group

  return result
}