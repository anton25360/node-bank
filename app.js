//create the express app
const express = require('express');
const app = express();
const cors = require('cors')
const routes = require('./Config/routes')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

//use any middleware
app.use(cors())

//include the routes
routes(app)

//make the app available elsewhere
module.exports = app