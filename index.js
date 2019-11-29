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

var getBalanceBiggerThan = (balanceVal, db, callback) => {
    db.collection('accounts').find({ balance: { $gte: balanceVal } }).toArray((err, docs) => {
        callback(docs)
    })
}

var getBalanceSmallerThan = (balanceVal, db, callback) => {
    db.collection('accounts').find({ balance: { $lte: balanceVal } }).toArray((err, docs) => {
        callback(docs)
    })
}

var increaseBalance = (db, accountName, balanceChange, callback) => {

    db.collection('accounts').updateOne({ name: accountName }, { $inc: { "balance": balanceChange } }, (err, docs) => {
        callback(docs)
    })
}

var decreaseBalance = (db, accountName, balanceChange, callback) => {
    var collection = db.collection('accounts')

    //decrease the balance
    collection.updateOne({ name: accountName }, { $inc: { "balance": balanceChange } }, (err, docs) => {
        callback(docs)
    })

    //get current balance
    var balanceCalculation = collection.findOne({ 'name': accountName }, (err, docs) => {
        var currentBalance = (docs['balance']);
        return currentBalance
    })
    
}

var insertAccountInDB = (name, balance, db, callback) => {
    db.collection('accounts').insertOne({ "name": name, "balance": balance }, (err, docs) => {
        callback(docs)
    })
}

var removeFromDB = (name, db, callback) => {
    db.collection('accounts').deleteOne({ "name": name }, (err, docs) => {
        callback(docs)
    })
}

//get all accounts
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

//get accounts bigger than a certain balance
app.get('/biggerThan', function (request, response) {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        console.log('connection successful')
        let db = client.db('bank')
        let balance = parseFloat(request.query.balance)

        // eg: GET + http://localhost:3000/biggerThan?balance=1000 -> more than 100
        getBalanceBiggerThan(balance, db, (documentsReturned) => {
            response.json(documentsReturned)
        })
        client.close()
    })
})

//get accounts smaller than a certain balance
app.get('/smallerThan', function (request, response) {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        console.log('connection successful')
        let db = client.db('bank')
        let balance = parseFloat(request.query.balance)

        // eg: GET + http://localhost:3000/smallerThan?balance=1000 -> less than 100
        getBalanceSmallerThan(balance, db, (documentsReturned) => {
            response.json(documentsReturned)
        })
        client.close()
    })
})

//add money to an account
app.put('/addMoney', jsonParser, (request, response) => {
    //{"name":"Alex", "balance":"100"} -> JSON
    const accountName = request.body.name
    const balanceIncrease = parseFloat(request.body.balance)

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        let db = client.db('bank')

        increaseBalance(db, accountName, balanceIncrease, (documentsReturned) => {
            response.json(documentsReturned)
        })
        client.close()
    })
})

//remove money from an account
app.put('/removeMoney', jsonParser, (request, response) => {
    //{"name":"Alex", "balance":"100"} -> JSON
    const accountName = request.body.name
    const balanceIncrease = parseFloat('-' + request.body.balance)

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        let db = client.db('bank')

        decreaseBalance(db, accountName, balanceIncrease, (documentsReturned) => {
            response.json(documentsReturned)
        })
        client.close()
    })
})

//create new account
app.post('/', jsonParser, function (request, response) {
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