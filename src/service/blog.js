/**
 * @description blog数据操作
 * @author rain
 */

const { Blog, User } = require('../db/model')
const { formatUser, formatBlog } = require('./_format')

async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

async function getBlogListByUser({ userName, pageIndex, pageSize }) {
  const userWhere = {}
  if (userName) {
    userWhere.userName = userName
  }

  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhere
      }
    ]
  })

  let blogList = result.rows.map(item => item.dataValues)

  blogList = formatBlog(blogList)
  blogList = blogList.map(item => {
    const user = item.user.dataValues
    item.user = formatUser(user)
    return item
  })
  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}
