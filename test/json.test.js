const server = require('./server')

test('测试json', async () => {
  const res = await server.post('/login').send({
    username: '',
    password: ''
  })
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
})
