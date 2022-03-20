const mongoose = require('mongoose');


const userPostSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('UserPost', userPostSchema, "userPosts");


module.exports = userModel;