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

// Show Route for Powers
router.get('/:id', (request, response) => {
    Power.findById(request.params.id, (err, foundPower) => {
        response.render('powers/show.ejs', {
            powers: foundPower
        });
    });
});

// Delete Route for Powers
router.delete('/:id', (request, response) => {
    Power.findByIdAndDelete(request.params.id, () => {
        response.redirect('/powers/index')
    });
});

// Edit Route for Powers
router.get('/:id/edit', (request, response) => {
    Power.findById(request.params.id, (err, foundPower) => {
        response.render('powers/edit.ejs', {
            powers: foundPower
        });
    });
});

// Update Route for Powers
router.put('/:id', (request, response) => {
    Power.findByIdAndUpdate(request.params.id, request.body, () => {
        response.redirect('/powers/index')
    });
});

module.exports = router