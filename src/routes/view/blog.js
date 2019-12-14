/**
 * @description 微博 view 路由
 * @author rain
 */

const router = require('koa-router')()
const { redirectCheck } = require('../../middlewares/loginCheck')

router.get('/', redirectCheck, async (ctx) => {
  await ctx.render('index', {})
})

module.exports = router