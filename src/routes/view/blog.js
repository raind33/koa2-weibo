/**
 * @description 微博 view 路由
 * @author rain
 */

const router = require('koa-router')()
const { redirectCheck } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')

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
      userInfo: curUserInfo
    }
  })
})

module.exports = router