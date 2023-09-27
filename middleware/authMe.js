const jwt = require("jsonwebtoken");
const db = require('../models/index')
const cookieParser = require("cookie-parser")

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            res.status(401).send({ message: "unauthrosied" })
        } else {
            const verifyuser = await jwt.verify(token, "Manishverma88180");
            console.log(verifyuser['userId'].email);
            const valieemail = verifyuser['userId'].email
            if (!valieemail) {
                res.status(500).send({ message: "internal server error" })
            } else {

                const User = db.Users
                const user = await User.findOne({
                    where: { email: valieemail },
                });
                return user
            }
            next();
        }




    } catch (error) {
        res.send({ message: error.message })
        console.log(error)
    }

}
module.exports = auth;


