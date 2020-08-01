// Require statements
const express = require('express');
const app = express();

const mongoose = require ('mongoose');

const Superhero = require('./models/superhero.js');


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

// New Superhero Route

app.get('/superheros/new', (request, response) => {
  response.render ('superheros/new.ejs')
});

// Create Superhero Route

app.post('/superheros', (request, response) => {
  Superhero.create(request.body, (err, createdSuperhero) => {
    response.redirect('/superheros/gallery')
    });
  });

// Index Route for Superheros

app.get('/superheros/gallery', (request, response) => {
  Superhero.find({}, (err, allSuperheros) => {
    response.render('superheros/index.ejs', {
      superheros: allSuperheros
    });  
  });
});

// Homepage Index Route

app.get('/superheros',(request, response) => {
  response.render('home.ejs')
});


// Show Route for Superheros

app.get('/superheros/:id', (request, response) => {
    Superhero.findById(request.params.id, (err, foundSuperhero) => {
        response.render('superheros/show.ejs', {
            superheros: foundSuperhero
    });
  });
});
      
      
//delete
//edit
//update


// // Update Route

// app.get('/superheros/show', (request, response) => {
//   response.render ('superheros/show.ejs')
// });

      
//  Listen function

app.listen(3000, () => {
  console.log('Heros GO!')
});