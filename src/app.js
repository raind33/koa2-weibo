const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatics = require('koa-static')
const jwtKoa = require('koa-jwt')

const { REDIS_CONF } = require('./conf/db.js')
const { SESSION_SECRET_KEY, SECRET } = require('./conf/constans.js')
const { isProd } = require('./utils/env')

const index = require('./routes/index')
const userApiRputer = require('./routes/api/user')
const userViewRouter = require('./routes/view/user.js')
const utilsApiRouter = require('./routes/api/utils')
const errorRouter = require('./routes/view/error')
// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(koaStatics(__dirname + '/public'))
app.use(koaStatics(path.join(__dirname, '..', '/uploadFiles')))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

// session配置
app.keys = [SESSION_SECRET_KEY]
app.use(
  session({
    key: 'weibo.sid', // cookie name默认是‘koa.sid’
    prefix: 'weibo:sess',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
)
// jwt 验证
// app.use(
//   jwtKoa({
//     secret: jwtSecret.SECRET
//   }).unless({
//     path: [/^\/users\/login$/]
//   })
// )
// routes
app.use(index.routes(), index.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userApiRputer.routes(), userApiRputer.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorRouter.routes(), errorRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
