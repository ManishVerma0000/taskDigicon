const bcrypt = require('bcryptjs')
const db = require('../models/index')
var validator = require("email-validator");


const userRegistration = async (req, res) => {
    try {

        const email = req.body.email
        const name = req.body.name
        const password = req.body.password
        const phone = req.body.phone
        const image = `http://localhost:7000/images/` + req.file.filename

        if (!name || !password || !email || !phone || !image) {
            res.status(400).send({ message: "please enter all the details" })
        } else {
            const validemail = validator.validate(email);
            if (!validemail) {
                res.status(400).send({ message: "please enter the valid email address" })
            } else {
                const Users = db.Users
                const user = await Users.findOne({
                    where: { email },
                });
                if (user) {
                    res.status(400).send({ message: "user is already exist please try other email" })
                } else {
                    const hashpasswrd = bcrypt.hashSync(password, 10)
                    let insertdata = await Users.create({
                        name: name,
                        email: email,
                        password: hashpasswrd,
                        image: image,
                        contactInfo: phone
                    })
                    res.render("login")
                }
            }

        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

module.exports = userRegistration