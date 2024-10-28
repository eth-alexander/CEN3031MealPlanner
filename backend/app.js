const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// display test message at at http://localhost:5000/
app.get('/', (req, res) => {
    res.send('Test: Backend is running!');
  });

// display list of users at http://localhost:5000/users
app.get('/users', async (req, res) => {
  try {
      const users = await User.find(); // Fetch all users
      res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send({ error: 'Failed to fetch users.' });
  }
});

// add user to database 
// can be done using Postman for example - need to implement frontend call to this
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

