const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const Client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})

const connectToDb = (callback) => {
    Client.connect((cb)=> {
        let db = Client.db('bank')
        callback(db)
    })
}

module.exports = connectToDb;