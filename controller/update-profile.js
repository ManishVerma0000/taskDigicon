const db = require('../models/index')
const bcrypt = require("bcryptjs")
const updateProfile = async (req, res) => {
    try {
        const id = req.params.userId
        const { password, email, phone } = req.body;
        const object = {}
        if (password) {
            const hashpasswrd = bcrypt.hashSync(password, 10)
            object['password'] = hashpasswrd
        }
        if (email) {
            object['email'] = email
        }
        if (phone) {
            object['contactInfo'] = phone
        }
        if (req.file) {
            const image = `http://localhost:7000/images/` + req.file.filename
            object['image'] = image
        }
        console.log(object)
        const Users = db.Users
        const data = await Users.update(object, {
            where: {
                id: id
            },
        })

        res.status(200).send({ message: "updated successfully", data: data })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

module.exports = updateProfile