/**
 * @description 微博 view 路由
 * @author rain
 */

const router = require('koa-router')()
const { redirectCheck } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans } = require('../../controller/user-relation')

// 首页
router.get('/', redirectCheck, async (ctx) => {
  await ctx.render('index', {})
})

// 个人主页

router.get('/profile', redirectCheck, async (ctx) => {
  const { userName } = ctx.session.userInfo
  await ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', redirectCheck, async (ctx) => {
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  const { userName: curUserName } = ctx.params
  const isMe = curUserName === myUserName
  let curUserInfo = {}
  if (isMe) {
    curUserInfo = myUserInfo
  } else {
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      return
    }
    curUserInfo = existResult.data
  }
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, count, blogList, pageSize, pageIndex } = result.data

  // 获取粉丝
  const fansResult = await getFans(curUserInfo.id)

  // 我是否关注了此人
  const amIFollowed = fansResult.data.userList.some(item => {
    return item.userName === myUserName
  })
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      count,
      pageIndex,
      pageSize,
      blogList
    },
    userData: {
      isMe,
      amIFollowed,
      userInfo: curUserInfo,
      fansData: {
        list: fansResult.data.userList,
        count: fansResult.data.count
      }
    }
  })
})

// 广场
router.get('/square', redirectCheck, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})
module.exports = router