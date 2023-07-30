const getImgNameByKey = require('../../helpers/getImgNameByKey');
const tableParcer = require('../../helpers/parse/tableParcer.js');
const StatsTemplate = require('./StatsTemplate');
const WeaponTemplate = require('./WeaponTemplate');

module.exports = data => {
  // console.log(data)

  const title = data.querySelector('h4').text;
  const categories = data.querySelector('.category-names>.caps').text.split(', ');
  const tablesNode = data.querySelectorAll('table');
  const weaponType = data.querySelectorAll('span.bold')[0].nextSibling.textContent.trim().split(', ')[0];

  const weaponObj = tableParcer(tablesNode[1])[0];
  const statsObj = tableParcer(tablesNode[0])[0];

  weaponObj.weaponType = weaponType.toLowerCase();

  const name = title.replace(/\[[^}]*\]/, '').trim();
  const pts = /\[([^}]*)\]/.exec(title)[1];

  return {
    name,
    avatar: getImgNameByKey(name) ?? '',
    pts,
    stats: StatsTemplate(statsObj),
    weapon: WeaponTemplate(weaponObj),
    imgs: categories.map(item => getImgNameByKey(item.trim())) ?? [],
  };
};
