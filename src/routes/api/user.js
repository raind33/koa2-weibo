/**
 * @description 用户api路由
 * @author rain
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')
const { genValidator } = require('../../middlewares/validator')
const userValidate = require('../../validator/user')

router.prefix('/api/user')

// 用户注册路由
router.post('/register', genValidator(userValidate), async ctx => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

// 用户是否存在
router.post('/isExist', async ctx => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 用户登录
router.post('/login', async ctx => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})
module.exports = router
