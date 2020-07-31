const mongoose = require ('mongoose');

const express = require('express');
const { response } = require('express');
const { request } = require('http');
const app = express();


const connectionString = 'mongodb://localhost/superheros'
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false
})

mongoose.connection.on('connected', () => {
  console.log(`mongoose connected to ${connectionString}`)

});

mongoose.connection.on('disconnected', () =>{
  console.log('mongoose disconnected')
})

// mongoose.connection.on('err', )

//  Listen function

app.listen(3000, () => {
  console.log('Heros GO!')
})

// Index Route

app.get('/superheros',(request, response) => {
  response.render('index.ejs')
})

// Index Route for Super Heros

app.get('/superheros/gallery', (request, response) => {
  response.render('superheros/index.ejs')
})

// Create a New Super Hero Route

app.get('/superheros/new', (request, response) => {
  response.render ('superheros/new.ejs')
})

// Update Route

app.get('/superheros/show', (request, response) => {
  response.render ('superheros/show.ejs')
})


