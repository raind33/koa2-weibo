const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db.js')
const { password, user, database, host } = MYSQL_CONF
const conf = {
  host: host,
  dialect: 'mysql'
}

// 线上环境使用连接池
conf.pool = {
  max: 5, // 连接池中最大连接数量
  min: 0,
  idle: 10000 // 如果一个连接池中10s之内没有被使用则释放
}
const seq = new Sequelize(database, user, password, conf)

// 测试连接

module.exports = seq
