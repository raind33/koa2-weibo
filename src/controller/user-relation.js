/**
 * @description 用户关系
 * @author rain
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUsersByFollower, addFollower, deleteFollower } = require('../service/user-relation')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
 
async function getFans (userId) {
  const { count, userList } = await getUsersByFollower(userId)

  return new SuccessModel({
    count,
    userList
  })
}

/**
 * 
 * @param {string} myUserId 当前登录用户id
 * @param {string} curUserId 要被关注的用户id
 */
async function follow (myUserId, curUserId) {
  try {
    const result = await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    console.log(error)
    return new ErrorModel(addFollowerFailInfo)
  }
}

async function unFollow (myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}
module.exports = {
  getFans,
  follow,
  unFollow
}