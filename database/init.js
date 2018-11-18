const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-test?wtimeoutMS=1000'
const { resolve } = require('path')
const glob = require('glob')
mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync((resolve(__dirname, './schema/', '**/*.js'))).forEach(require)
}
exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'CP'
  })

  console.log('user===', user)

  if (!user) {
    const user = new User({
      username: 'CP',
      email: 'koa2@imooc.com',
      password: '123qwe'
    })
    // user.save()
  }
}

exports.connect = () => {
  let maxConnectTimes = 0;
  return new Promise((resolve, reject) => {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    // if (process.env.NODE_ENV !== 'production') {
    //   mongoose.set('debug', true)
    // }
    mongoose.connect(db, { useNewUrlParser: true })

    mongoose.connection.on('disconnected', () => {
      console.log('disconnect')
      maxConnectTimes++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        throw new Error('数据库挂了，快去fix')
      }
    })

    mongoose.connection.on('error', err => {
      console.log('error')
      maxConnectTimes ++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        throw new Error('数据库挂了，快去fix')
      }
    })

    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      // var schema = new mongoose.Schema({ name: 'string'});
      // var Tank = mongoose.model('Tank', schema);

      // var small = new Tank({ name: 'small' });
      // small.save()
      //   .then(() => {
      //     console.log('saved')
      //   })

      resolve()
    })
  })
}
