//create the express app
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const app = express();
const cors = require('cors')
const routes = require('./Config/routes')

// const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://localhost:27017'

//use any middleware
app.use(cors())
app.use(jsonParser)

//include the routes
routes(app)

//make the app available elsewhere
module.exports = app