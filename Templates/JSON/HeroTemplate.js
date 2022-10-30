const getImgNameByKey = require('../../helpers/getImgNameByKey')
module.exports = (data) => {
  // console.log(data)

  const title = data.querySelector('h4').text
  const categories = data.querySelector('.category-names>.caps').text.split(', ')

  const name = title.replace(/\[[^}]*\]/, '').trim()
  const pts = /\[([^}]*)\]/.exec(title)[1]

  return {
    name,
    pts,
    imgs: categories.map(item => getImgNameByKey(item.trim())) ?? []
  }
}