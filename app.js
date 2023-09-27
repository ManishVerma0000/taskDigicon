const express = require("express")
const PORT = 6000;
const ejs = require('ejs')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const connection = require("./db/conn")
require('./models/index')
const router = require("./router/route")
app.set('view engine', 'ejs');
app.use(router)

app.listen(PORT, () => {
    console.log(`server is ruuning on the port ${PORT}`)
})
