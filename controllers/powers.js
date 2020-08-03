// Require Statements
const express = require('express');
const Superhero = require('../models/superhero');
const Power = require('../models/power');

const router = express.Router();


// Index Route for Superhero Powers
router.get('/index', (request, response) => {
    Power.find({}, (err, allPowers) => {
        response.render('powers/index.ejs', {
            powers: allPowers
        });  
    });
});


module.exports = router