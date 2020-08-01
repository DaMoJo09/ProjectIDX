// Require statements
const express = require('express');
const app = express();

const mongoose = require ('mongoose');

const Superhero = require('./models/superhero.js');
const { response } = require('express');

// Middleware

app.use(express.urlencoded({extended:false}));

// Database connection
const connectionString = 'mongodb://localhost/superheros'
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


// Homepage Index Route

app.get('/superheros',(request, response) => {
  response.render('home.ejs')
});

// Index Route for Super Heros

app.get('/superheros/gallery', (request, response) => {
  response.render('superheros/index.ejs')
});

// Create a New Super Hero Route

app.get('/superheros/new', (request, response) => {
  response.render ('superheros/new.ejs')
});

// Update Route

app.get('/superheros/show', (request, response) => {
  response.render ('superheros/show.ejs')
});

// Update Route
app.post('/superheros/', (request, response) => {
  Superhero.create(request.body, (err, createdSuperhero) => {
    response.redirect('/superheros')
  })
})

// Show Route
app.get('/superheros', (request, response) => {
  Superhero.find({}, (err, foundSuperheros) => {
    response.render('/superheros/index.ejs', {
      superheros: foundSuperheros
    })
  })
})



//  Listen function

app.listen(3000, () => {
  console.log('Heros GO!')
});