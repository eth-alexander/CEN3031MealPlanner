const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    MealDBid: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    area: { type: String, required: true },
    recipe: { type: String, required: true },
    ingredients: { type: [String], required: true },
    measurements: { type: [String], required: true },
    image: { type: String, required: true },
    source: { type: String, required: true },
});

const mealModel = mongoose.model('Meal', mealSchema);

module.exports = mealModel;
