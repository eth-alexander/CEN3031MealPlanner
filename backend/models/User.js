const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: { type: String, required: true },
    saved_recipes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Meal', default: [] },
})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel