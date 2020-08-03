const mongoose = require('mongoose')
const Powers = require("./powers")

const superheroSchema = new mongoose.Schema({
    name: String,

    powers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Power'
    }]
})

const Superhero = mongoose.model('Superhero', superheroSchema)

module.exports = Superhero