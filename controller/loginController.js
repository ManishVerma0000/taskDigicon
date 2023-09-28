
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const db = require('../models/index')
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send({ message: "please enter the details" })
        } else {
            const User = db.Users
            const user = await User.findOne({
                where: { email },
            });
            if (!user) {
                res.status(400).send({ message: "user is not exist in the db" })
            } else {
                const existuser = user.dataValues
                const comparePassword = bcrypt.compareSync(password, existuser.password)
                if (comparePassword) {
                    let jwtSecretKey = process.env.KEY;
                    let data1 = {
                        time: Date.now() + 1000 * 60 * 60 * 24,
                        userId: { email: existuser.email },
                    }
                    var token = jwt.sign(data1, jwtSecretKey);
                    res.cookie("jwt", token)
                    res.render("profile")
                } else {
                    res.status(400).send({ message: "password mIsmatch" })
                }
            }
        }

    } catch (error) {
        res.status(400).send({ message: error.message })

    }
}

module.exports = loginUser