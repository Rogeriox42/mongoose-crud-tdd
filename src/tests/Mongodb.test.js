const Database = require('../db/Mongodb') 
const assert = require('assert')

const database = new Database() 

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
})