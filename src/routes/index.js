const router = require('koa-router')()
const { loginCheck, redirectCheck } = require('../middlewares/loginCheck')

router.get('/', redirectCheck, async (ctx, next) => {
  console.log(232)
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    message: '哈哈',
    isMe: true,
    blogList: [
      { title: 'aa', id: 1 },
      { title: 'bb', id: 2 },
      { title: 'cc', id: 3 }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 哈哈json'
  }
})
router.get('/profile/:username', async (ctx, next) => {
  const { username } = ctx.params
  ctx.body = {
    username
  }
})
module.exports = router
