const { DataTypes } = require('sequelize')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true,
    }
})