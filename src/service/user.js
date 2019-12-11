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
  if (password) {
    Object.assign(whereObj, { password })
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

async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName || userName
  })
  return result.dataValues
}

async function delUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0
}

async function updateUser(
  { userName, password },
  { nickName, city, picture, newPassword }
) {
  const data = {}
  if (nickName) {
    data.nickName = nickName
  }
  if (city) {
    data.city = city
  }
  if (picture) {
    data.picture = picture
  }
  if (newPassword) {
    data.password = newPassword
  }
  const whereData = { userName }
  if (password) {
    whereData.password = password
  }
  const result = await User.update(data, {
    where: whereData
  }
  )

  return result[0] > 0
}
module.exports = {
  getUserInfo,
  createUser,
  delUser,
  updateUser
}
