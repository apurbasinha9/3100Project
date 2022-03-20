const userModel = require("../Models/userPosts")


exports.userPostAdd = async (req, res) => {

    const userPost = new userModel(req.body)
    await userPost.save((err, user_post) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add the post"
            })
        }

        return res.json({
            message: "Success",
            user_post
        })
    })
}


exports.userPostShow = async (req, res) => {
    const { city, province, temperature } = req.body;
    userModel.findOne({ city, province, temperature }, (err, result) => {
        if (err || !result) {
            return res.status(400).json({
                error: "not showing"
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