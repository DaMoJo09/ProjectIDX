const express = require('express');
const { response } = require('express');
const { request } = require('http');
const app = express();

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
