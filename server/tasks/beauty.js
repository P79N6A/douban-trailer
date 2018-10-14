const puppeteer = require('puppeteer')

const path = require('path')
const oss = require('ali-oss');
const rp = require('request-promise')
const config = require('../../config')

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})
async function getWelfareImage (url) {

  // 返回解析为Promise的浏览器
  const browser = await puppeteer.launch()

  // 返回新的页面对象
  const page = await browser.newPage()

  // 页面对象访问对应的url地址
  await page.goto(url, {
      waitUntil: 'networkidle2'
  })

  // 等待3000ms，等待浏览器的加载
  await sleep(1000)

  // 可以在page.evaluate的回调函数中访问浏览器对象，可以进行DOM操作
  const urls = await page.evaluate(() => {
      let ol = document.getElementsByClassName('commentlist')[0]
      let imgs = ol.getElementsByTagName('img')
      let url = []
      for (let i = 0; i < imgs.length; i++) {
          url.push(imgs[i].getAttribute("src"))
      }

      // 返回所有美女图的url地址数组
      return url
  })
  const store = oss(config.ossconfig)
  for (let i = 0; i < urls.length; i++) {
    // request-promise，返回一个buffer对象
    let fetchResult = await rp({url:urls[i], encoding:null});
    // 通过buffer的方式上传到cdn
    await store.put(`beauty/cp-${path.basename(urls[i])}`, fetchResult);
  }

  // 关闭无头浏览器
  await browser.close()

  return Promise.resolve()
}

getWelfareImage('http://jandan.net/ooxx')
