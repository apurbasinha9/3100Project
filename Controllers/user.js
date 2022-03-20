const User = require("../models/user")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.signup = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            })
        }

        return res.json({
            message: "Success",
            user
        })
    })
}


exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "email was not found"
            })
        }

        ///authenticate

        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "email and password do not match"
            })
        }


        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)


        //token to cookie
        res.cookie('token', token, { expire: new Date() + 1 })

        //get to display
        const { _id, name, email } = user;
        return res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        })
    })
}


exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "user signout successfull"
    })
}