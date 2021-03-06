const Router = require('koa-router')
const router = new Router()
const { controller, get, post, put } = require('../lib/decorator')
const {
  checkPassword
} = require('../service/user')


@controller('/api/v0/user')
export class userController {
  @post('/')
  async login (ctx, next) {
    const { email, password } = ctx.request.body
    // const Movie = mongoose.model('Movie')
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (ctx.body = {
        sucess: false,
        err: '用户不存在'
      })
    }
    if (matchData.match) {
      return (ctx.body = {
        sucess: true
      })
    }
    return (ctx.body = {
      sucess: false,
      err: '密码不正确'
    })
  }
}

