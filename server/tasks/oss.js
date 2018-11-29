let movies = [{
  video: 'http://vt1.doubanio.com/201810131708/2fb9ee86ff792f2b7a33a7fab3e7017f/view/movie/M/302160387.mp4',
  doubanId: 3742360,
  cover: 'https://img3.doubanio.com/view/photo/photo/public/p2524242574.webp',
  poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p1512562287.jpg'
}]

const nanoid = require('nanoid')
const path = require('path');
const oss = require('ali-oss');
const config = require('../../config')
const rp = require('request-promise')
const store = oss(config.ossconfig)

;(async () => {
  // movies.forEach(async (movie) => {
  //   let result = await rp({url:movie.poster, encoding:null});
  // })
  for(let movie of movies) {
    if(movie.poster) {
      console.log(movie.poster)
      let fetchResult = await rp({url:movie.poster, encoding:null});
      let putResult = await store.put(`douban-store/cp-${nanoid()}${path.extname(movie.poster)}`, fetchResult);
      console.log(putResult)
    }

    if(movie.cover) {
      console.log(movie.cover)
      let fetchResult = await rp({url:movie.cover, encoding:null});
      let putResult = await store.put(`douban-store/cp-${nanoid()}${path.extname(movie.cover)}`, fetchResult);
      console.log(putResult)
    }

    if(movie.video) {
      console.log(movie.video)
      let fetchResult = await rp({url:movie.video, encoding:null});
      console.log(fetchResult)
      let putResult = await store.put(`douban-store/cp-${nanoid()}${path.extname(movie.video)}`, fetchResult);
      console.log(putResult)
    }
  }
    // console.log(result)
    // let stream = fs.createReadStream(result)

    // let result = await rp({url:movies[0].poster, encoding:null});

    // Object.keys(movie).forEach(async (key) => {
    //   let result;
    //   if(key === 'video') {
    //     result = await store.put(`douban-store/${nanoid()}.mp4`, movie[key]);
    //   } else if(key === 'cover') {
    //     result = await store.put(`douban-store/${nanoid()}.webp`, movie[key]);
    //   }else if(key === 'poster') {
    //     result = await store.put(`douban-store/${nanoid()}.jpeg`, movie[key]);
    //   }
    //   console.log(result)
    // })
  // })
})();
