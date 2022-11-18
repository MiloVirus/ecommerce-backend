const mongoose = require('mongoose');

const dbConnection = async () => 
{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connection succesful')
    } catch (error) {
        throw new Error('Database connection failed')
    }
}

module.exports = {dbConnection}