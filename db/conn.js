require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
})

try {
    sequelize.authenticate();
    console.log('MySQL Authentication');
}catch(err) {
    console.log(err);
    console.log("Erro ao conectar")
}

module.exports = sequelize