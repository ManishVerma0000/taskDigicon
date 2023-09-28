const db = require("../models/index")



const getProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const User = db.Users
        const user = await User.findOne({
            where: { id: id }
        });
        res.status(200).send({ message: "user details is here", data: user })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

module.exports = getProfile