const User = require("../Models/user")
const jwt = require('jsonwebtoken')


exports.signup = async (req, res) => {

    const user = new User(req.body)
    await user.save((err, user) => {
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


exports.signin = async (req, res) => {
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


exports.signout = async (req, res) => {
    await res.clearCookie("token")
    return res.json({
        message: "user signout is successful"
    })
}