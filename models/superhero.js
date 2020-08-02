const mongoose = require('mongoose')

const superheroSchema = new mongoose.Schema({
    name: String
})

const Superhero = mongoose.model('Superhero', superheroSchema)

module.exports = Superhero