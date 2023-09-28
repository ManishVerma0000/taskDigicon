const express = require("express")

const multer = require('multer')


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
const UpdateProfileoftheuser = require("../controller/update-profile")
const loginUser = require("../controller/loginController")
const userRegistration = require("../controller/RegistrationController")
const UpdateProfile = require("../controller/updateProfile")
const auth = require("../middleware/authMe")

router.post("/updateProfile/:userId", upload.single('file'), UpdateProfileoftheuser)
router.get("/updateprofile/:id", UpdateProfile)
router.get('/me', auth)
router.post('/register', upload.single('file'), userRegistration)
router.post("/login", loginUser)




module.exports = router