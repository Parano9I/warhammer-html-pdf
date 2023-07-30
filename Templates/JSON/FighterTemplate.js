const getImgNameByKey = require('../../helpers/getImgNameByKey.js');
const tableParcer = require('../../helpers/parse/tableParcer.js');
const StatsTemplate = require('./StatsTemplate.js');
const WeaponTemplate = require('./WeaponTemplate.js');

module.exports = data => {
  const nameAndPtsStr = data.querySelector('h4').text;
  const ptsStr = /\[([^}]*)\]/.exec(nameAndPtsStr)[1];
  const nameStr = nameAndPtsStr.replace(/\[[^}]*\]/, '').trim();
  const categories = data.querySelector('.caps').text.split(', ');
  const tablesNode = data.querySelectorAll('table');
  const weaponType = data.querySelectorAll('span.bold')[0].nextSibling.textContent.trim().split(', ')[0];

  const weaponObj = tableParcer(tablesNode[1])[0];
  const statsObj = tableParcer(tablesNode[0])[0];

  weaponObj.weaponType = weaponType.toLowerCase();

  return {
    name: nameStr,
    repeats: 1,
    stats: StatsTemplate(statsObj),
    weapon: WeaponTemplate(weaponObj),
    imgs: categories.map(item => getImgNameByKey(item.trim())) ?? [],
    pts: ptsStr,
  };
};
