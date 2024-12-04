const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    saved_recipes: {type: [mongoose.Schema.Types.ObjectId], ref: 'Meal', deafault: []},
})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel