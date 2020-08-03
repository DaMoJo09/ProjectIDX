// Require Statements
const express = require('express');
const Superhero = require('../models/superhero');
const Power = require('../models/power');

const router = express.Router();

// New Power Route
router.get('/new', (request, response) => {
    response.render ('powers/new.ejs')
});
  
// Create Power Route
router.post('/', (request, response) => {
    Power.create(request.body, (err, createdPower) => {
        response.redirect('/powers/index')
    });
});

// Index Route for Superhero Powers
router.get('/index', (request, response) => {
    Power.find({}, (err, allPowers) => {
        response.render('powers/index.ejs', {
            powers: allPowers
        });  
    });
});


module.exports = router