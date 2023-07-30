const getImgNameByKey = require("../../helpers/getImgNameByKey");

module.exports = data => {
  return {
    type: {
      value: data.weaponType,
      img: getImgNameByKey(data.weaponType) ?? '',
    },
    range: {
        value: data.range,
        img: getImgNameByKey('range') ?? '',
    },
    attacks: {
        value: data.attacks,
        img: getImgNameByKey('attacks') ?? '',
    },
    strength: {
        value: data.strength,
        img: getImgNameByKey('strength') ?? '',
    },
    damage: {
        value: data.damage,
        img: getImgNameByKey('damage') ?? '',
    },
  };
};
