const router = require('koa-router')()
const jsonwebtoken = require('jsonwebtoken')

const jwtSecret = require('../conf/constans.js')

router.prefix('/users')

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.post('/login', function(ctx, next) {
  const { password, username } = ctx.request.body
  let userinfo
  if (username === 'rain' && password === '123') {
    userinfo = {
      username: 'rain',
      nickname: '吴玉亮'
    }
  }
  // 加密userinfo
  if (userinfo) {
    token = jsonwebtoken.sign(userinfo, jwtSecret.SECRET, { expiresIn: '1h' })
  }
  if (!userinfo) {
    ctx.body = {
      errno: -1,
      msg: '信息错误'
    }
    return
  }
  ctx.body = {
    errno: 0,
    data: token
  }
})

module.exports = router
