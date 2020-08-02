// Require Statements
const express = require('express');
const app = express();

const mongoose = require ('mongoose');

const methodOverride = require('method-override');

// Models
const Superhero = require('./models/superhero.js');
const { response, request } = require('express');

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

// New Superhero Route
app.get('/superheroes/new', (request, response) => {
  response.render ('superheroes/new.ejs')
});

// Create Superhero Route
app.post('/superheroes', (request, response) => {
  Superhero.create(request.body, (err, createdSuperhero) => {
    response.redirect('/superheroes/gallery')
    });
  });

// Index Route for Superheroes
app.get('/superheroes/gallery', (request, response) => {
  Superhero.find({}, (err, allSuperheroes) => {
    response.render('superheroes/index.ejs', {
      superheroes: allSuperheroes
    });  
  });
});

// Homepage Index Route
app.get('/superheroes',(request, response) => {
  response.render('home.ejs')
});


// Show Route for Superheroes
app.get('/superheroes/:id', (request, response) => {
    Superhero.findById(request.params.id, (err, foundSuperhero) => {
        response.render('superheroes/show.ejs', {
            superheroes: foundSuperhero
    });
  });
});
      
      
// Delete Route for Superheroes
app.delete('/superheroes/:id', (request, response) => {
  Superhero.findByIdAndDelete(request.params.id, () => {
    response.redirect('/superheroes/gallery')
  });
});


// Edit Route for Superheroes
app.get('/superheroes/:id/edit', (request, response) => {
  Superhero.findById(request.params.id, (err, foundSuperhero) => {
    response.render('superheroes/edit.ejs', {
      superheroes: foundSuperhero
    });
  });
});

// Update Route for Superheroes
app.put('/superheroes/:id', (request, response) => {
  Superhero.findByIdAndUpdate(request.params.id, request.body, () => {
    response.redirect('/superheroes/gallery')
  });
});


      
//  Listen function
app.listen(3000, () => {
  console.log('Heroes GO!')
});