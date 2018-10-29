const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-test'
mongoose.Promise = global.Promise

exports.connect = () => {
  let maxConnectTimes = 0;
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db, { useNewUrlParser: true })

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes ++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        throw new Error('数据库挂了，快去fix')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnectTimes ++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        throw new Error('数据库挂了，快去fix')
      }
    })

    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      var schema = new mongoose.Schema({ name: 'string', size: 'string' });
      var Tank = mongoose.model('Tank', schema);

      var small = new Tank({ size: 'small' });
      small.save()
        .then(() => {
          console.log('saved')
        })

      resolve()
    })
  })
}
