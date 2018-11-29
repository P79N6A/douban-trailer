const Koa = require('koa')
const views = require('koa-views')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('../database/init.js')

const R = require('ramda')
const MIDDLEWARES = [  'router', 'parcel' ]

const userMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () => {
  await connect()
  initSchemas()
  await initAdmin()
  // require('./tasks/movie')
  // require('./tasks/api')
  const app = new Koa()
  await userMiddlewares(app)
  app.listen(4455)
})();

