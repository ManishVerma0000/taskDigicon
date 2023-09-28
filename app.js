const express = require("express")
const PORT = 7000;
const ejs = require('ejs')
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
app.set('view engine', 'ejs');
app.use(cookieParser())
var bodyParser = require('body-parser')

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
const connection = require("./db/conn")
require('./models/index')
const router = require("./router/route")
// app.set('views', path.join(__dirname, 'views'))
///updateProfile/<%=userId%>
app.use(express.static('public'))
app.use(router)

app.use('/images', express.static('images'))
app.get('/loginuser', (req, res) => {
    res.render('login')
});
app.get('/RegisterUser', (req, res) => {
    res.render('register')
});



app.listen(PORT, () => {
    console.log(`server is ruuning on the port ${PORT}`)
})
