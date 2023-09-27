module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "Users", {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            default: ""
        },
        password: {
            type: DataTypes.STRING,
            default: ""
        },
        contactInfo: {
            type: DataTypes.STRING,
            default: ""
        },
        image: {
            type: DataTypes.STRING,
            default: ""
        }
    }
    )
    return Users
}
