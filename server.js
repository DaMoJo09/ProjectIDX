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

// Index ROute for Super Heros

app.get('/superheros/gallery', (request, response) => {
  response.render('superheros/index.ejs')
})
