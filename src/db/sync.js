/**
 * @description sequelize同步数据库
 * @author rain
 */
const seq = require('./seq')

// require('./model.js')

seq
  .authenticate()
  .then(() => {
    console.log('ok')
  })
  .catch(e => {
    console.log(e)
  })

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('sync 完成')
  process.exit()
})
