const { Route } = require('../lib/decorator')
const { resolve } = require('path')

export const router = app => {
  console.log('middlewares')
  const apiPath = resolve(__dirname, '../routes')
  const router = new Route(app, apiPath)
  router.init()
}
// module.exports = router
