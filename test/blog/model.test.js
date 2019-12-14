/**
 * @description user model 测试
 * @author rain
 */


const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性，符合预期', () => {
    // build 会构建一个内存的 Blog 实例，但不会提交到数据库中
    const user = Blog.build({
        userId: 1,
        content: '6666',
        image: '/xxx.png'
    })
    // 验证各个属性
    expect(user.userId).toBe(1)
    expect(user.content).toBe('6666')
    expect(user.image).toBe('/xxx.png')
})
