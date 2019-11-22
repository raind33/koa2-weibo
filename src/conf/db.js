/**
 * @description 配置文件
 * @author rain
 */
const { isProd, isTest } = require('../utils/env')
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '2331336537',
  port: '3306',
  database: 'koa2_weibo_db'
}

// test环境不要打印日志
if (isTest) {
  confirm.logging = () => {}
}
if (isProd) {
}
module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
