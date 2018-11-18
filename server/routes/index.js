const mongoose = require('mongoose')
import { controller, get, post, put } from '../lib/decorator'
const {
  getAllMovies,
  getMovieDetail,
  getRelativeMovies
} = require('../service/movie')

const Movie = mongoose.model('Movie')

@controller('/api/v0/movies')
export class movieController {
  @get('/')
  async getMovies (ctx, next) {
    console.log('ctx', ctx)
    const { type, year } = ctx.query
    const movies = await getAllMovies(type, year)
    ctx.body = {
      movies
    }
  }

  @get('/:id')
  async getMovieDetail (ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMovies(movie)
    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}

