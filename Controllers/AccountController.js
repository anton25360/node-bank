//bring in all the services that this controller needs to work
const AccountService = require('../Services/AccountService');

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
    DbService((db) => {
        AccountService.getAccountsBiggerThan(db, (document) => {
            response.json(document)
        })
    })
}

const getAccountsSmallerThan = (request, response) => {
    DbService((db) => {
        AccountService.getAccountsSmallerThan(db, (document) => {
            response.json(document)
        })
    })
}

const addMoney = (request, response) => {
    DbService((db) => {
        AccountService.addMoney(db, (document) => {
            response.json(document)
        })
    })
}

const removeMoney = (request, response) => {
    DbService((db) => {
        AccountService.removeMoney(db, (document) => {
            response.json(document)
        })
    })
}

const createAccount = (request, response) => {
    DbService((db) => {
        AccountService.createAccount(db, (document) => {
            response.json(document)
        })
    })
}

const deleteAccount = (request, response) => {
    DbService((db) => {
        AccountService.deleteAccount(db, (document) => {
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