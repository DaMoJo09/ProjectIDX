const mongoose = require('mongoose')
const Schema = mongoose.Schema

const superheroSchema = ({
    name: String,
    gender: String,
    race: String, 
    mask: Boolean,
    weapon: Boolean,

    powers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Power'
    }]
})

const Superhero = mongoose.model('Superhero', superheroSchema)

module.exports = Superhero