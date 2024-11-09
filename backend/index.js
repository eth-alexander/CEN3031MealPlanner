// mongodb+srv://ethanalexander:<db_password>@chomp.1gyb9.mongodb.net/?retryWrites=true&w=majority&appName=CHOMP

const config = require("./config.json");
const connectDB = require('./db.js')
connectDB()
/* hey */

const userModel = require('./models/Users.js')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
});

app.get('/users', async (req, res) => {
    try {
        const users = await userModel.find(); // Fetch all users
        res.status(200).json(users); // Send the users as a JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to fetch users.' });
    }
});
  
app.post('/users', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

app.listen(5005, () => {
    console.log("app is running");
})
