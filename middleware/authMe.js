const jwt = require("jsonwebtoken");
const db = require('../models/index')
const cookieParser = require("cookie-parser")

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token)
        if (!token) {
            res.status(401).send({ message: "unauthrosied" })
        } else {
            const verifyuser = await jwt.verify(token, process.env.KEY);
            console.log(verifyuser['userId'].email);
            const valieemail = verifyuser['userId'].email
            if (!valieemail) {
                res.status(500).send({ message: "internal server error" })
            } else {
                const User = db.Users
                const user = await User.findOne({
                    where: { email: valieemail },
                })
                console.log(user.dataValues, 'this is the user')
                req.user = user;
                 res.status(200).send({ message: "user details is here", data: user.dataValues })
            }
            // next();
        }

    } catch (error) {
        res.send({ message: error.message })
        console.log(error)
    }

}
module.exports = auth;


