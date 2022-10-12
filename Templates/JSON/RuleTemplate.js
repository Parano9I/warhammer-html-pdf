const getImgNameByKey = require("../../helpers/getImgNameByKey.js");

module.exports = (data) => {
    const fullName = data.querySelector('.bold').text.trim().trimEnd(':');
    const text = data.text.replace(/\[([^}]*)\:/, '').trim();

    let categories = /\(([^}]*)\)/.exec(fullName);
    categories = categories ? categories[1].split(', ') : [];

    return {
        name: fullName.replace(/\(([^}]*)\)/, ''),
        imgs: categories.map((item) => getImgNameByKey(item)) ?? '',
        text: /\s+(..+)/.exec(text)[1],
    }
}