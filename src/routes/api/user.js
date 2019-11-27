/**
 * @description 用户api路由
 * @author rain
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

// 用户注册路由
router.post('/register', async (ctx) => {

})

// 用户是否存在
router.post('/isExist', async (ctx) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router
