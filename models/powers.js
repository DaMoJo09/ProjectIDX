const mongoose = require("mongoose")
const Schema = mongoose.Schema

powersSchema = {
    name: String,
    description: String,
}

const Powers = mongoose.model("powers", powersSchema)

module.exports = Powers
