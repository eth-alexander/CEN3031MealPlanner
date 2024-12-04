// mongodb+srv://ethanalexander:<db_password>@chomp.1gyb9.mongodb.net/?retryWrites=true&w=majority&appName=CHOMP

const config = require("./config.json");
const connectDB = require('./db.js');
connectDB();

const userModel = require('./models/User.js');

const express = require('express');
const cors = require('cors');
const mealModel = require("./models/Meal.js");
const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
});

app.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to fetch users.' });
    }
});
  
app.post('/users', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new userModel({ username, password });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

app.get('/meals', async (req, res) => {
    try {
        const meals = await mealModel.find();
        res.status(200).json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).send({ error: 'Failed to fetch meals.' });
    }
});

app.post('/users/:userId/recipes', async (req, res) => {
    const { userId } = req.params; // Extract userId from route parameters
    const { mealId } = req.body;  // Extract mealId from request body

    try {
        // Fetch the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch the meal by ID
        const meal = await mealModel.findById(mealId);
        if (!meal) {
            return res.status(404).json({ error: "Meal not found" });
        }

        // Add the meal's _id to the user's saved_recipes array
        user.saved_recipes.push(meal._id);

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: "Recipe added successfully", user });
    } catch (error) {
        console.error("Error saving recipe:", error);
        res.status(500).send({ error: "Failed to save recipe." });
    }
});


app.listen(5005, () => {
    console.log("app is running");
});
