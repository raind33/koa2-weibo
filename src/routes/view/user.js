/**
 * @description 用户登录注册
 * @author rain
 */

const router = require('koa-router')()
const { redirectCheck } = require('../../middlewares/loginCheck')

function getLoginInfo(ctx) {
  let data = {
    isLogin: false // 默认未登录
  }

  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }

  return data
}

router.get('/login', async ctx => {
  await ctx.render('login', getLoginInfo(ctx))
})
router.get('/register', async ctx => {
  await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', redirectCheck, async (ctx) => {
  await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router
