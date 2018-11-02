const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { connect, initSchemas } = require('../database/init.js')
const router = require('./routes')

;(async () => {
  await connect()
  initSchemas()
  // require('./tasks/movie')
  // require('./tasks/api')
})();
app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(views(resolve(__dirname, '../views'), {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'Luke',
    me: 'cp'
  })
})
app.listen(4455)
