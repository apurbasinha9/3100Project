const weatherModel = require("../Models/weather")

exports.cityWeather = async (req, res) => {
    const { city, province } = req.params;
    console.log(req.params)

    weatherModel.findOne({ city, province }, (err, result) => {
        if (err || !result) {
            return res.status(400).json({
                error: "city was not found"
            })
        }
        //get to display
        const { city, province, temperature } = result;
        return res.json({
            result: {
                city, province, temperature
            }
        })
    })
}

