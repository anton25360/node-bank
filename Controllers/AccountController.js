//bring in all the services that this controller needs to work
const AccountService = require('../Services/AccountService');
const DbService = require('../Services/DbService');

//the controller links services to the route
//controller handles the req + sets the response

const getAllAccounts = (request, response) => {
    DbService((db) => {
        AccountService.getAllAccounts(db, (document) => {
            response.json(document)
        })
    })
}

const getAccountsBiggerThan = (request, response) => {
    var balanceVal = request.query.balance
    DbService((db) => {
        AccountService.getAccountsBiggerThan(balanceVal, db, (document) => {
            response.json(document)
        })
    })
}

const getAccountsSmallerThan = (request, response) => {
    DbService((db) => {
        var balanceVal = request.query.balance
        AccountService.getAccountsSmallerThan(balanceVal, db, (document) => {
            response.json(document)
        })
    })
}

const addMoney = (request, response) => {

    var accountName = request.body.name
    var balanceIncrease = parseFloat(request.body.balance)
    
    DbService((db) => {
        AccountService.addMoney(db, accountName, balanceIncrease, (document) => {
            response.json(document)
        })
    })
}

const removeMoney = (request, response) => {

    var accountName = request.body.name
    var balanceDecrease = parseFloat('-'+request.body.balance)

    DbService((db) => {
        AccountService.removeMoney(db, accountName, balanceDecrease, (document) => {
            response.json(document)
        })
    })
}

const createAccount = (request, response) => {

    var name = request.body.name
    var balance = parseFloat(request.body.balance)

    DbService((db) => {
        AccountService.createAccount(name, balance, db, (document) => {
            response.json(document)
        })
    })
}

const deleteAccount = (request, response) => {

    let name = request.params.name

    DbService((db) => {
        AccountService.deleteAccount(name, db, (document) => {
            response.json(document)
        })
    })
}

//make it available in the routes.js file
module.exports.getAllAccounts = getAllAccounts
module.exports.getAccountsBiggerThan = getAccountsBiggerThan
module.exports.getAccountsSmallerThan = getAccountsSmallerThan
module.exports.addMoney = addMoney
module.exports.removeMoney = removeMoney
module.exports.createAccount = createAccount
module.exports.deleteAccount = deleteAccount