// Require Statements
const express = require('express');
const app = express();

const mongoose = require ('mongoose');

const methodOverride = require('method-override');

// Models
const Superhero = require('./models/superhero.js');
const Powers = require("./models/powers.js")

// Middleware
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:false}));

// Database Connection
const connectionString = 'mongodb://localhost/superhero'

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`mongoose connected to ${connectionString}`)

});

mongoose.connection.on('disconnected', () =>{
  console.log('mongoose disconnected')
});

mongoose.connection.on('error', (err) => {
  console.log('mongoose error: ', err)
});

const heroRouter = require("./controllers/superheroes")
const powerRouter = require("./controllers/powers")
app.use("/superheroes", heroRouter)
app.use("/superheroes", powerRouter)
      
//  Listen function
app.listen(3000, () => {
  console.log('Heroes GO!')
});