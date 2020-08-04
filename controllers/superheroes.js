
// Require Statements
const express = require('express');
const Superhero = require('../models/superhero');
const Power = require('../models/power');

const router = express.Router();



// New Superhero Route
router.get('/new', (request, response) => {
    response.render ('superheroes/new.ejs')

});

// Create Superhero Route
router.post('/', (request, response) => {
    Superhero.create(request.body, (err, createdSuperhero) => {
        response.redirect('/superheroes/gallery')
    });
});

// Index Route for Superheroes
router.get('/gallery', (request, response) => {
    Superhero.find({}, (err, allSuperheroes) => {
        response.render('superheroes/index.ejs', {
            superheroes: allSuperheroes
        });  
    });
});

// Show Route for Powers
router.get('/:id', (request, response) => {
    console.log(request.params.id)
    Superhero.findById(request.params.id)
        .populate({
            path: 'powers',
        })
    .exec((err, foundSuperhero) => {
            console.log(foundSuperhero, 'found superhero')
        if(err){
            response.send(err)
        } else {
            response.render('superheroes/show.ejs', {
                powers: foundSuperhero.powers,
                superheroes: foundSuperhero
            });
        };
    });
});

// Delete Route for Superheroes
router.delete('/:id', (request, response) => {
    Superhero.findByIdAndDelete(request.params.id, () => {
        response.redirect('/superheroes/gallery')
    });
});

// Edit Route for Superheroes
router.get('/:id/edit', (request, response) => {
    Superhero.findById(request.params.id, (err, foundSuperhero) => {
        response.render('superheroes/edit.ejs', {
            superheroes: foundSuperhero
        });
    });
});

// Update Route for Superheroes
router.put('/:id', (request, response) => {
    Superhero.findByIdAndUpdate(request.params.id, request.body, () => {
        response.redirect('/superheroes/gallery')
    });
});

module.exports = router
