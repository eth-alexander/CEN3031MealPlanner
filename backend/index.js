// mongodb+srv://ethanalexander:<db_password>@chomp.1gyb9.mongodb.net/?retryWrites=true&w=majority&appName=CHOMP

const express = require('express')
const connectDB = require('./db.js')
const userModel = require('./models/User.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
connectDB()

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
        const user = new userModel({ username, password });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

app.listen(5000, () => {
    console.log("app is running");
})
