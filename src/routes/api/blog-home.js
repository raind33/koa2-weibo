/**
 * @description 微博首页api路由
 * @author rain
 */

const router = require('koa-router')()

const { loginCheck } = require('../../middlewares/loginCheck')
const { create } = require('../../controller/blog')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/user')

router.prefix('/api/blog')
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx) => {
  const { id: userId } = ctx.session.userInfo
  const { content, image } = ctx.request.body
  ctx.body = await create({ userId, content, image })
})

module.exports = router