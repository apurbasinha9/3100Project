const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    ID: {
        type: Number
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true
    }

});
const weatherModel = mongoose.model('CityWeather', weatherSchema, 'cityWeather');

module.exports = weatherModel;
