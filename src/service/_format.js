/**
 * @description 格式化数据
 * @author rain
 */

const { DEFAULT_PICTURE } = require('../conf/constans')
function _formatPicture(obj) {
  if (!obj.picture) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 
 * @param {Array|obj|null} list 
 */
function formatUser(list) {
  if (!list) {
    return list
  }
  if (list instanceof Array) {
    return list.map(_formatPicture)
  }

  return _formatPicture(list)
}

module.exports = {
  formatUser
}