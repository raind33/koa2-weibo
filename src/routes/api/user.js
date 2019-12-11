/**
 * @description 用户api路由
 * @author rain
 */

const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  delCurUser,
  changeInfo,
  changePassword,
  logout
} = require('../../controller/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginCheck')
const userValidate = require('../../validator/user')
const { isTest } = require('../../utils/env')

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

// 删除test用户
router.post('/delete', loginCheck, async ctx => {
  if (isTest) {
    let { userName } = ctx.session.userInfo
    ctx.body = await delCurUser(userName)
  }
})
// 修改个人信息
router.patch(
  '/changeInfo',
  loginCheck,
  genValidator(userValidate),
  async ctx => {
    const { userName } = ctx.session.userInfo
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { userName, city, picture, nickName })
  }
)

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate) ,async ctx => {
  const { userName } = ctx.session.userInfo
  const { password, newPassword } = ctx.request.body
  ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async ctx => {
  ctx.body = await logout(ctx)
})
module.exports = router
