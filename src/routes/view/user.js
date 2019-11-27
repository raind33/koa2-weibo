/**
 * @description 用户登录注册
 * @author rain
 */

const router = require('koa-router')()

router.get('/login', async ctx => {
  await ctx.render('login', {})
})
router.get('/register', async ctx => {
  await ctx.render('register', {})
})

module.exports = router
