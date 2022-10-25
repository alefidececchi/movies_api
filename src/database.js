const mongoose = require('mongoose')
const MONGO_DB = process.env.MONGO_DB


const main = async () => {
    try {
        await mongoose.connect(MONGO_DB);
        console.log('database connected: ', MONGO_DB);
    } catch (error) {
        throw error
    }
};

module.exports = main;