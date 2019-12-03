/**
 * @description 验证中间件
 * @author rain
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
/**
  * 生成json schema的验证中间件
  * @param {function} validateFunc 验证函数
  */
function genValidator(validateFunc) {
  return async function (ctx, next) {
    const error = validateFunc(ctx.request.body)
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return 
    }
    await next()
  }
}

module.exports = {
  genValidator
}
