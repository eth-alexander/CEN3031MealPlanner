const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://ethanalexander:XMGAvbRrq5syYZGU@chomp.1gyb9.mongodb.net/testdb?retryWrites=true&w=majority&appName=CHOMP');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB