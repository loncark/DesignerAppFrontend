import validator from 'validator';

export const inputIsValid = (keyword) => {
    return hasValidCharacters(keyword) && noSqlInjection(keyword);
}
function hasValidCharacters(keyword) {
    return keyword === '' || (/^[a-zA-Z0-9\s\-_.,!|?'"()]+$/.test(keyword));
}
function noSqlInjection(keyword) {
    return !/['";%]/.test(keyword);
}

export const nameIsValid = (name) => {
    return inputIsValid(name) && name.length <= 100;
}
export const titleIsValid = (title) => {
    return inputIsValid(title) && title.length <= 140;
}
export const tagIsValid = (tag) => {
    return inputIsValid(tag) && tag.length <= 14;
}
export const linkIsValid = (link) => {
    return link === '' || validator.isURL(link);
}

export const dimesionInputIsValid = (str) => {
    if (!validator.isNumeric(str) || !validator.isInt(str)) {
      return false;
    }
    const num = parseInt(str, 10);
    return num > 63;
}
export const stepInputIsValid = (steps) => {
    return validator.isInt(steps) && parseInt(steps, 10) > 0;
}