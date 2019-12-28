const Mongoose = require('mongoose')

const Schema = Mongoose.Schema

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        default: new Date()
    },
    imdb: Number
})

if (Mongoose.models.Movies)
    delete Mongoose.models.Movies
const MovieModel = Mongoose.model('Movies', movieSchema)

module.exports = MovieModel 