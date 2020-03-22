const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB= require('./config/db');

dotenv.config({path:'./config/config.env'})

connectDB();

const transactions = require('./routes/transactions')

const app = express();


if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'))
}

app.use(express.json()); //body parser

app.use('/api/v1/transactions',transactions)

if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"))

  app.get('*',(req,res) => (path.resolve(__dirname,"client","build","index.html")))
}




const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))