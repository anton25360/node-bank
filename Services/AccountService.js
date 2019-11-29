var getAllAccounts = (db, callback) => {
    db.collection('accounts').find({}).toArray((err, docs) => {
        callback(docs)
    })
}

var getAccountsBiggerThan = (balanceVal, db, callback) => {
    
    db.collection('accounts').find({ balance: { $gte: balanceVal } }).toArray((err, docs) => {
        console.log(err);
        
        callback(docs)
    })
}

var getAccountsSmallerThan = (balanceVal, db, callback) => {
    db.collection('accounts').find({ balance: { $lte: balanceVal } }).toArray((err, docs) => {
        callback(docs)
    })
}

var addMoney = (db, accountName, balanceChange, callback) => {
    db.collection('accounts').updateOne({ name: accountName }, { $inc: { "balance": balanceChange } }, (err, docs) => {
        
        callback(docs)
    })
}

var removeMoney = (db, accountName, balanceChange, callback) => {
    var collection = db.collection('accounts')

    //decrease the balance
    collection.updateOne({ name: accountName }, { $inc: { "balance": balanceChange } }, (err, docs) => {
        callback(docs)
    })

    //get current balance
    // var balanceCalculation = collection.findOne({ 'name': accountName }, (err, docs) => {
    //     var currentBalance = (docs['balance']);
    //     return currentBalance
    // })
    
}

var createAccount = (name, balance, db, callback) => {
    db.collection('accounts').insertOne({ "name": name, "balance": balance }, (err, docs) => {
        callback(docs)
    })
}

var deleteAccount = (name, db, callback) => {
    db.collection('accounts').deleteOne({ "name": name }, (err, docs) => {
        
        callback(docs)
    })
}

module.exports.getAllAccounts = getAllAccounts
module.exports.getAccountsBiggerThan = getAccountsBiggerThan
module.exports.getAccountsSmallerThan = getAccountsSmallerThan
module.exports.addMoney = addMoney
module.exports.removeMoney = removeMoney
module.exports.createAccount = createAccount
module.exports.deleteAccount = deleteAccount