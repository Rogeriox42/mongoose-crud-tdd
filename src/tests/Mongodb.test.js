const Database = require('../db/Mongodb') 
const assert = require('assert')

const database = new Database() 
const MOCK_MOVIE_CREATE = {
    name: 'The Matrix', 
    genre: 'Action', 
    release_date: '03/06/1999', 
    imdb: 6.9
}
const MOCK_MOVIE_UPDATE = {
    name: 'Inception', 
    genre: 'Fiction', 
    release_Date: '09/10/2008', 
    imdb: 7.4
}

describe('Database tests', function(){
    this.beforeAll( async function () {
        this.timeout(10000)
        await database.connect()
    })
    
    it('Verify Check Connection', async function(){
        const result = database.isConnected() 
        const expected = 'Conectado'
        assert.deepEqual(result, expected) 
    })

    it('Create Item', async () =>{
        const result = await database.create(MOCK_MOVIE_CREATE) 
        const nMovie = {name: result.name, genre: result.genre, release_date: result.release_date, imdb: result.imdb}
        assert.deepEqual(nMovie, MOCK_MOVIE_CREATE)
    })
})