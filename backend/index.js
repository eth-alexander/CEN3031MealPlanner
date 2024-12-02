// mongodb+srv://ethanalexander:<db_password>@chomp.1gyb9.mongodb.net/?retryWrites=true&w=majority&appName=CHOMP

const config = require("./config.json");
const connectDB = require('./db.js');
connectDB();

const userModel = require('./models/User.js');

const express = require('express');
const cors = require('cors');
const mealModel = require("./models/Meal.js");
const app = express();
const jwt = require('jsonwebtoken');

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


app.listen(5005, () => {
    console.log("app is running");
});
