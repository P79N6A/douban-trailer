
const rp = require('request-promise')

async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const res = await rp(url)
  return res
}

;(async () => {
  let movies = [{ doubanId: 26683290,
    title: '你的名字。',
    rate: 8.4,
    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2395733377.jpg' },
  { doubanId: 1295644,
    title: '这个杀手不太冷',
    rate: 9.4,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p511118051.jpg' } ]

    movies.map(async movie => {
      let movieData = await fetchMovie(movie)
      try {
        movieData = JSON.parse(movieData)
        console.log(movieData.tags)
      } catch (err) {
        console.log(err)
      }
    })

})()

