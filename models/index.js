const { Sequelize, DataTypes } = require('sequelize')


const sequelize = new Sequelize(
    'test',
    'root',
    '',
    {
        host: "localhost",
        dialect: 'mysql',
        logging: false
    })


sequelize.authenticate().then(() => {
    console.log('connected')
}).catch((err) => {
    console.log('errr', err)
})

const db = {}
db.Sequelize = Sequelize,
    db.sequelize = sequelize



db.sequelize.sync({ force: false }).then(() => {
    console.log('user table is created')
}).catch((err) => {
    console.log('error occurs')
})
db.Users = require('./users')(sequelize, DataTypes)
module.exports = db