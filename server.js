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

// New Super Hero Route

app.get('/superheros/new', (request, response) => {
  response.render ('superheros/new.ejs')
});

// Create Superhero Route
app.post('/superheros', (request, response) => {
  Superhero.create(request.body, (err, createdSuperhero) => {
    response.redirect('/superheros/gallery')
    });
  });

// Index Route for Super Heros

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

// // Update Route

// app.get('/superheros/show', (request, response) => {
//   response.render ('superheros/show.ejs')
// });


// // Show Route
// app.get('/superheros/gallery', (request, response) => {
//   Superhero.find({}, (err, allSuperheros) => {
//     response.render('/superheros/index.ejs', {
//       superheros: allSuperheros
//     })
//   })
// })


//delete
//edit
//update


//  Listen function

app.listen(3000, () => {
  console.log('Heros GO!')
});