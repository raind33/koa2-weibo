/**
 * @description 连接redis的方法
 * @author rain
 */

const redis = require('redis')
const { CONF_REDIS } = require('../conf/db.js')

// 创建客户端
const redisClient = redis.createClient(CONF_REDIS.host, CONF_REDIS.port)

redisClient.on('error', e => {
  console.error('redis error', e)
})

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间单位s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 *
 * @param {string} key
 */
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.stringify(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}
module.exports = {
  set,
  get
}
