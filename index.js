const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

const app = express()
const jsonParser = bodyParser.json()
const url = 'mongodb://localhost:27017'

var getAccountsFromDB = (db, callback) => {
    db.collection('accounts').find({}).toArray((err, docs) => {
        callback(docs)
    })
}

var insertAccountInDB = (name, balance, db, callback) => {
    db.collection('accounts').insertOne({"name":name, "balance":balance}, (err, docs) => {
        callback(docs)
    })
}

var removeFromDB = (name, db, callback) => {
    db.collection('accounts').deleteOne({"name":name}, (err, docs) => {
        callback(docs)
    })
}

//get all account
app.get('/', function (request, response) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        console.log('connection successful')
        let db = client.db('bank')

        //eg: GET + http://localhost:3000/
        getAccountsFromDB(db, (documentsReturned) => {
            response.json(documentsReturned)
        })
        client.close()
    })
})

//create new account
app.post('/', jsonParser, function(request, response) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        let name = request.body.name
        let balance = request.body.balance
        let db = client.db('bank')

        //eg: POST + http://localhost:3000/ + {"name":"Alexa","balance":"100"} -> in body
        insertAccountInDB(name, balance, db, (documentsReturned) => {
            response.json(documentsReturned)
        })
        client.close()
    })
})

//delete an account
app.delete('/:name', (request, response) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        let db = client.db('bank')
        let name = request.params.name

        //eg: DELETE + http://localhost:3000/Alexa
        removeFromDB(name, db, (documentsReturned) => {
            response.json(documentsReturned)
        })
        client.close()
    }) 
})

app.listen(3000)