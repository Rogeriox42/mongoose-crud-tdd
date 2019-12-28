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

    create(item){
        return this._banco.create(item) 
    }

    read(query, skip = 0, limit = 10){
        return this._banco.find(query).skip(skip).limit(limit)
    }
    
    update(id, item){
        return this._banco.update({_id: id}, {$set: item})
    }

    delete(id){
        return this._banco.deleteOne({_id: id}) 
    }

    async connect() {
        await Mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }, (error) => {
            if (error) {
                console.log('Erro na conexão', error)
                return;
            }
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
            release_date: String,
            imdb: Number
        })

        if (Mongoose.models.Movies)
            delete Mongoose.models.Movies
        this._banco = Mongoose.model('Movies', movieSchema)
    }

    isConnected() {
        return STATUS[this._conn.readyState]
    }
}

module.exports = MongoDB