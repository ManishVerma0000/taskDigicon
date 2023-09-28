const db = require("../models/index")
const axios = require('axios')


const UpdateProfileoftheuser = async (req, res) => {
    try {
        const customerId = req.params.id
        const userData = {
            userId: customerId,
        };

        res.render("updateprofile", userData)

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

module.exports = UpdateProfileoftheuser