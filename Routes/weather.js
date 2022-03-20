const express = require("express")
const { cityWeather } = require("../Controllers/weather")

const router = express.Router()

router.get('/city_weather', cityWeather)

module.exports = router