const Mongoose = require('mongoose')

// const URI = "mongo://mongodb:27017/herois" 
// const URI = "mongodb://rogeriorodrigues:senhasecreta@localhost:27017/herois" 
const URI = "mongodb://rogeriorodrigues:minhasenhasecreta@localhost:27017/herois"

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
}

class MongoDB {
    constructor() {
        this._conn = null
        this._banco = null
    }

    async connect() {
        await Mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }, (error) => {
            if (error) {
                console.log('Erro na conexão', error)
                return;
            }
            // const connection = Mongoose.connection
            // connection.once('open', () => console.log('Database up and runnning!')) 
            this._conn = Mongoose.connection
            this._conn.once('open', () => console.log('Database up and runnning!'))
            this.modelDatabase()
        })
    }

    modelDatabase() {
        const movieSchema = new Mongoose.Schema({
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

        // delete Mongoose.models.Movies 
        // this._banco = Mongoose.model.Movies 
        // this._banco = Mongoose.models.Movies ? Mongoose.models.Movies : Mongoose.model('Movies', movieSchema)
        if (Mongoose.models.Movies)
            delete Mongoose.models.Movies
        this._banco = Mongoose.model('Movies', movieSchema)
    }

    isConnected() {
        return STATUS[this._conn.readyState]
    }

    create(item) {

    }
}

module.exports = MongoDB