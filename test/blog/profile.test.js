/**
 * @description 个人主页测试
 * @author rain
 */

const server = require('../server')
const { COOKIE, USER_NAME} = require('../userInfo')

test('个人主页，加载更多应该成功', async () => {
  const res = await server
      .get(`/api/profile/loadmore/${USER_NAME}/0`)
      .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('blogList')
})