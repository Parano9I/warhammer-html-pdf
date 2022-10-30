const rulesParser = require('./rulesParser')

module.exports = (findGroupName, groups) => {
  const ruleGroup = groups.find(group => {
    const groupName = group.querySelector('h2').text

    return findGroupName === groupName
  })

  return rulesParser(ruleGroup)
};