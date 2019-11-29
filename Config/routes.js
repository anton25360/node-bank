const AccountController = require('../Controllers/AccountController');

//pass the whole application into this function
const routes = (app) => {

    //get all accounts
    app.get('/', AccountController.getAllAccounts)

    //get accounts bigger than a certain balance
    app.get('/biggerThan', AccountController.getAccountsBiggerThan)

    //get accounts smaller than a certain balance
    app.get('/smallerThan', AccountController.getAccountsSmallerThan)

    //add money to an account
    app.put('/addMoney', AccountController.addMoney)

    //remove money from an account
    app.put('/removeMoney', AccountController.removeMoney)

    //create new account
    app.post('/', AccountController.createAccount)

    //delete an account
    app.delete('/:name', AccountController.deleteAccount)
}

//making it available to be used in app.js
module.exports = routes;