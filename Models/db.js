// database connection
const Mongoose = require("mongoose")
const connectDB = async () => {
    await Mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("MongoDB Connected")
}
module.exports = connectDB

