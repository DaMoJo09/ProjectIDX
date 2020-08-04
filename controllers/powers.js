// Require Statements
const express = require('express');
const Superhero = require('../models/superhero');
const Power = require('../models/power');

const router = express.Router();

// New Power Route
router.get('/new', (request, response) => {
    Superhero.find({}, (err, allSuperheroes) => {
        response.render ('powers/new.ejs', {
            superheroes: allSuperheroes
        })
    });
});
  
// Create Power Route
router.post('/', (request, response) => {
    Power.create(request.body, (err, createdPower) => {
        if(err){
            response.send(err);
        } else {
            Superhero.findById(request.body.superheroId, (error, foundSuperhero) => {
                console.log(foundSuperhero, 'foundSuperhero');
                foundSuperhero.powers.push(createdPower);
                foundSuperhero.save((err, savedSuperhero) => {
                    console.log(savedSuperhero, 'savedNewSuperhero')
                    response.redirect('/powers/index'); 
                });
            });
        };
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
    Superhero.findOne({'powers': request.params.id})
        .populate({
                path: 'powers',
                match: {_id: request.params.id}
            })
        .exec((err, foundSuperhero) => {
            console.log(foundSuperhero, 'found superhero')
        if(err){
            response.send(err)
        } else {
            response.render('powers/show.ejs', {
                superheroes: foundSuperhero,
                powers: foundSuperhero.powers[0]
            });
        };
    });
});

// Delete Route for Powers
router.delete('/:id', (request, response) => {
    Power.findByIdAndDelete(request.params.id, (err, deletedPower) => {
        Superhero.findOne({'powers': request.params.id}, (err, foundSuperhero) => {
            if(err) {
                response.send(err)
            } else {
                foundSuperhero.powers.remove(request.params.id)
                foundSuperhero.save((err, updatedSuperhero) => {
                    console.log(updatedSuperhero)
                    response.redirect('/powers/index')
                });
            };
        });
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
