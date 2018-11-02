const { readFile } = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {

}

const yy = new EE()

yy.on('event', () => {
  console.log('出大事了')
})

setTimeout(() => {
  console.log('0 毫秒后到期执行定时器毁掉') // 7
})

setTimeout(() => {
  console.log('100 毫秒后到期执行定时器毁掉') // 8
}, 100)

setTimeout(() => {
  console.log('200 毫秒后到期执行定时器毁掉')
}, 200)

readFile('../package.json', 'utf-8', data => {
  console.log('完成文件 1 读取回掉') // 9
})

readFile('../README.md', 'utf-8', data => {
  console.log('完成文件 2 读取回掉') // 10
})

setImmediate(() => {
  console.log('immediate 立即回掉') // 2
})

process.nextTick(() => {
  console.log('proces.nextTick 的回掉') // 1
})

Promise.resolve()
  .then(() => {
    yy.emit('event') // 3
    process.nextTick(() => {
      console.log('proces.nextTick 第二次2的回掉') // 5
    })
    console.log('promise 的第一次回掉') // 4
  })
  .then(() => {
    console.log('promise 的第二次回掉') //6
  })

