/**
 * @description user controller
 * @author rain
 */

const { getUserInfo } = require('../service/user')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
const { registerUserNameNotExist } = require('../model/ErrorInfo')
/**
 *
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExist)
  };
}

module.exports = {
  isExist
}
