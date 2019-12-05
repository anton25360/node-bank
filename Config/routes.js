const AccountController = require('../Controllers/AccountController');

//TODO FIX BIGGER OR SMALLER THAN GET ACCOUNTS

//pass the whole application into this function
//Don't forget to select GET / POST / PUT / DELETE
const routes = (app) => {

    //eg: http://localhost:3000/accounts
    app.get('/accounts', AccountController.getAllAccounts)

    // eg: http://localhost:3000/biggerThan?balance=1000
    app.get('/biggerThan', AccountController.getAccountsBiggerThan)

    // eg: http://localhost:3000/smallerThan?balance=1000
    app.get('/smallerThan', AccountController.getAccountsSmallerThan)

    //eg: {"name":"Alex", "balance":"100"} -> JSON body
    app.put('/addMoney', AccountController.addMoney)

    //eg: {"name":"Alex", "balance":"100"} -> JSON body
    app.put('/removeMoney', AccountController.removeMoney)

    //eg: {"name":"Alex", "balance":"100"} -> JSON body
    app.post('/', AccountController.createAccount)

    //eg: http://localhost:3000/Alexa
    app.delete('/:name', AccountController.deleteAccount)
}

//making it available to be used in app.js
module.exports = routes;