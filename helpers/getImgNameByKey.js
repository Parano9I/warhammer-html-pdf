import imgMaps from "../assets/imgMaps.js";

export default (key) => {
    return imgMaps.find((item) => {
        return item.value?.trim() === key.trim();
    })?.fileName;
};
