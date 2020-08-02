const mongoose = require('mongoose')
const Powers = require("./powers")

const superheroSchema = new mongoose.Schema({
    name: String,
    Powers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Powers"
    }]
})

const Superhero = mongoose.model('Superhero', superheroSchema)

module.exports = Superhero