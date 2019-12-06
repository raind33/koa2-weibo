const server = require('../server')

let user = {
  userName: 'rain3',
  password: '123',
  gender: '1',
  city: '苏州'
}
 let COOKIE
describe('test用户相关api', () => {
  test('用户注册 ', async () => {
    const res = await server.post('/api/user/register').send(user)
    expect(res.errno).toBe(0)
  })
  test('用户重复注册 ', async () => {
    const res = await server.post('/api/user/register').send(user)
    expect(res.errno).not.toBe(0)
  })
  test('用户json schema ', async () => {
    const res = await server.post('/api/user/register').send({
      userName: 'rain4',
      password: '12',
      gender: 'mail',
      city: '苏州'
    })
    expect(res.errno).not.toBe(0)
  })
  
  test('用户是否已存在', async () => {
    const res = await server.post('/api/user/isExist')
                  .send(user)
    expect(res.errno).toBe(0)
  })
  test('用户登录', async () => {
    const res = await server.post('/api/user/isExist')
                  .send(user)
    expect(res.errno).toBe(0)
  })
  test('用户删除', async () => {
    const res = await server.post('/api/user/delete')
                  .send(user)
    expect(res.errno).toBe(0)
  })
  test('用户删除之后不存在', async () => {
    const res = await server.post('/api/user/isExist')
                  .send(user)
    expect(res.errno).not.toBe(0)
  })
})
