/**
 * @description user controller
 * @author rain
 */

const { getUserInfo, createUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
 *
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 
 * @param {object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))

  if(userInfo) {
    ctx.session.userInfo = userInfo
    return new SuccessModel()
  } else {
    return new ErrorModel(loginFailInfo)
  }
}
module.exports = {
  isExist,
  register,
  login
}
