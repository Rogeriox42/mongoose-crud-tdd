const Database = require('../db/Mongodb')
const assert = require('assert')

const database = new Database()
const MOCK_MOVIE_CREATE = {
    name: 'Matrix Revolutions',
    genre: 'Guild War',
    release_date: '03/06/1999',
    imdb: 6.9
}

const MOCK_MOVIE_UPDATE = {
    name: 'Inception',
    genre: 'Fiction',
    release_date: '09/10/2008',
    imdb: 7.4
}

MOCK_MOVIE_ID = ''

describe('Database tests', function () {
    this.beforeAll(async function () {
        this.timeout(10000)
        await database.connect()
        const result = await database.create(MOCK_MOVIE_UPDATE)
        MOCK_MOVIE_ID = result._id
    })

    it('Verify Check Connection', async function () {
        const result = database.isConnected()
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })

    it('Create Item', async () => {
        const result = await database.create(MOCK_MOVIE_CREATE)
        const nMovie = { name: result.name, genre: result.genre, release_date: result.release_date, imdb: result.imdb }
        assert.deepEqual(nMovie, MOCK_MOVIE_CREATE)
    })

    it('Read Item', async () => {
        const [result] = await database.read({ name: MOCK_MOVIE_CREATE.name })
        const rMovie = { name: result.name, genre: result.genre, release_date: result.release_date, imdb: result.imdb }
        assert.deepEqual(rMovie, MOCK_MOVIE_CREATE)
    })

    it('Update Item', async () => {
        const item = { name: 'Star Wars' }
        const result = await database.update(MOCK_MOVIE_ID, item)
        assert.deepEqual(result.n, 1)
    })

    it('Delete Item', async () => {
        const [{ _id: id }] = await database.read({ name: MOCK_MOVIE_CREATE.name })
        const result = await database.delete({ _id: id })
        assert.deepEqual(result.n, 1)
    })

})