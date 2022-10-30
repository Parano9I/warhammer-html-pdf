const WeaponTemplate = require('./WeaponTemplate.js')
const getImgNameByKey = require('../../helpers/getImgNameByKey.js')

module.exports = (data) => {

  const nameAndPtsStr = data.querySelector('h4').text
  const ptsStr = /\[([^}]*)\]/.exec(nameAndPtsStr)[1]
  const nameStr = nameAndPtsStr.replace(/\[[^}]*\]/, '').trim()
  const categories = data.querySelector('.caps').text.split(', ')

  const weaponData = data.querySelector('p')?.text
    .replace('Selections: ', '')
    .trim()
    .split(', ')

  return {
    name: nameStr,
    repeats: 1,
    imgs: categories.map(item => getImgNameByKey(item.trim())) ?? [],
    pts: ptsStr,
    weapons: weaponData ? weaponData.map(weapon => WeaponTemplate(weapon)) : []
  }
}