const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
let testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}
let COOKIE
describe('test用户相关api', () => {
  test('用户注册 ', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).toBe(0)
  })
  test('用户重复注册，应该失败 ', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).not.toBe(0)
  })
  test('用户json schema ', async () => {
    const res = await server.post('/api/user/register').send({
      userName: 'rain4',
      password: '12',
      gender: 1,
      city: '苏州'
    })
    expect(res.body.errno).not.toBe(0)
  })

  test('用户是否已存在', async () => {
    const res = await server.post('/api/user/isExist').send(testUser)
    expect(res.body.errno).toBe(0)
  })
  test('用户登录', async () => {
    const res = await server.post('/api/user/login').send(testUser)
    expect(res.body.errno).toBe(0)

    // 获取cookie
    const resCookie = res.headers['set-cookie']
    COOKIE = resCookie
  })
  test('用户删除', async () => {
    const res = await server.post('/api/user/delete').set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
  })
  test('用户删除之后不存在', async () => {
    const res = await server.post('/api/user/isExist').send(testUser)
    expect(res.body.errno).not.toBe(0)
  })
})
