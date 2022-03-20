const express = require("express")
const { cityWeather } = require("../controllers/user")

const router = express.Router()

router.get('/city_Weather', cityWeather)

module.exports = router