const express = require("express")
const { userPostAdd, userPostShow } = require("../Controllers/userPost")

const router = express.Router()


router.post('/city_weather_info_post', userPostAdd)
router.get('/city_weather_info_show', userPostShow)


module.exports = router