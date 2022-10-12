const imgMaps = require("../assets/imgMaps.js");

module.exports = (key) => {
    return imgMaps.find((item) => {
        return item.value?.trim() === key.trim();
    })?.fileName;
};
