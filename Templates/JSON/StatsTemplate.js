const getImgNameByKey = require('../../helpers/getImgNameByKey');

module.exports = data => {

  return {
    move: {
      value: data.move,
      img: getImgNameByKey('move') ?? '',
    },
    toughness: {
      value: data.toughness,
      img: getImgNameByKey('toughness') ?? '',
    },
    wounds: {
      value: data.wounds,
      img: getImgNameByKey('toughness') ?? '',
    },
  };
};
