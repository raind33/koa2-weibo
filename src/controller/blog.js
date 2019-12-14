/**
 * @description 微博相关路由
 * @author rain
 */

const { createBlog } = require('../service/blog')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const xss = require('xss')

async function create ({ userId, content, image }) {
  try {
    const result = await createBlog({ userId, content: xss(content), image })
    return new SuccessModel(result)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}