/**
 * @description 用户数据模型
 * @author rain
 */

const seq = require('../seq')
const { STRING, TEXT, DECIMAL } = require('../types')

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户姓名'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '用户密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '用户昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别：男1女2保密3'
  },
  picture: {
    type: STRING,
    comment: '图片地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = User
