const mongoose = require('mongoose')

const powerSchema = new mongoose.Schema({
    type: String,
    description: String
})

const Power = mongoose.model('Power', powerSchema)

module.exports = Power