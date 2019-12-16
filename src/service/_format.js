/**
 * @description 格式化数据
 * @author rain
 */

const { DEFAULT_PICTURE } = require('../conf/constans')
const { timeFormat } = require('../utils/dt')

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

/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
* 格式化微博信息
* @param {Array|Object} list 微博列表或者单个微博对象
*/
function formatBlog(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatDBTime)
  }
  // 对象
  return _formatDBTime(list)
}

module.exports = {
  formatUser,
  formatBlog
}