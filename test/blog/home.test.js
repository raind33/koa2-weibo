/**
 * @description 微博首页单元测试
 * @author rain
 */

const { COOKIE } = require('../userInfo')
const server = require('../server')

// 存储微博id
let WEIBO_ID

test('微博创建api', async () => {
  const res = await server.post('/api/blog/create')
                .send({
                  content: '888',
                  image: '/xxxx.png'
                })
                .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe('888')
  expect(res.body.data.image).toBe('/xxxx.png')

  WEIBO_ID = res.body.data.id
})
