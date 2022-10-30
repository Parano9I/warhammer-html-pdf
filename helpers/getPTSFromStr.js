module.exports = (str) => {
  return /\[([^}]*)\]/.exec(str)[1];
};