const express = require("express")

const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images')
//     },
//     filename: function (req, file, cb) {

//         cb(null, file.fieldname)
//     }
// })

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `images-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter,
});

const router = express.Router()

const loginUser = require("../controller/loginController")
const userRegistration = require("../controller/RegistrationController")
const auth = require("../middleware/authMe")

router.get('/me', auth)
router.post('/register', upload.single('images'), userRegistration)
router.post("/login", loginUser)




module.exports = router