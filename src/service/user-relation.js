const { User, UserRelation} = require('../db/model')
const { formatUser } = require('./_format')

async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [['id', 'desc']],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })

  let userList = result.rows.map(row => {
    return row.dataValues
  })
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param {string} userId 
 * @param {string} followerId 
 */
async function addFollower (userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })

  return result.dataValues
}

/**
 * 删除关注关系
 * @param {string} userId 
 * @param {string} followerId 
 */
async function deleteFollower (userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })

  return result > 0
}

module.exports = {
  getUsersByFollower,
  addFollower,
  deleteFollower
}