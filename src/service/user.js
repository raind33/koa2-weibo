/**
 * @description 用户处理
 * @author rain
 */

const { User } = require('../db/model')
const { formatUser } = require('./_format')

async function getUserInfo(userName, password) {
  let whereObj = {
    userName
  }
  if(password) {
    Object.assign(whereObj, password)
  }

  let userInfo = await User.findOne({
    where: whereObj
  })
  if (userInfo === null) {
    return userInfo
  }
  const formatRes = formatUser(userInfo.dataValues)
  return formatRes
}

module.exports = {
  getUserInfo
}