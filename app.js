const connectDB = require("./Models/db");
const mongoose = require("mongoose")
const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();


//Connecting the Database
connectDB();

/*
    for views folder we have added the files using html and bootstrap. not yet connected for the 
    frontend.
*/

// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Import the routes
const userRoutes = require("./routes/user")
const weatherRoutes = require("./routes/weather")
const userPostRoutes = require("./routes/userPost")

// Using routes
app.use('/auth', userRoutes)
app.use('/weather', weatherRoutes)
app.use('/weatherUserPost', userPostRoutes)


const port = process.env.PORT || 8000

// Starting a server
app.listen(port, () => {
    console.log(`App is running at ${port}`)
})