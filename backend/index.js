// mongodb+srv://ethanalexander:<db_password>@chomp.1gyb9.mongodb.net/?retryWrites=true&w=majority&appName=CHOMP

const express = require('express')
const connectDB = require('./db.js')
const userModel = require('./models/Users.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
connectDB()

app.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.listen(5000, () => {
    console.log("app is running");
})