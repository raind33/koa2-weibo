/**
 * @description 个人主页
 * @author rain
 */

const { getBlogListByUser } = require('../service/blog')
const { PAGE_SIZE } = require('../conf/constans')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
/**
 * 获取微博个人主页微博列表 
 * @param {string} userName  用户名
 * @param {number} pageIndex 当前页面
 */

async function getProfileBlogList(userName, pageIndex=0) {
  const result = await getBlogListByUser({userName, pageIndex, pageSize: PAGE_SIZE})

  return new SuccessModel({
    isEmpty: result.blogList.length === 0,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count,
    blogList: result.blogList
  })
}

module.exports = {
  getProfileBlogList
}