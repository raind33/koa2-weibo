const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * api 登录验证
 * @param {*} ctx 
 * @param {*} next 
 */
async function loginCheck(ctx, next) {
  if (ctx.session.info) {
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {} ctx 
 * @param {*} next 
 */
async function redirectCheck(ctx, next){
  if(ctx.session.info) {
    await next()
    return
  }
  const curUrl = ctx.url
  ctx.redirect('login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  redirectCheck
}