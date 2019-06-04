const Sequelize = require('sequelize');
const config = require('./config');

const options = {
    database: config.POSTGRES_DATABASE,
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    dialect: 'postgres'
};

const sequelize = new Sequelize(options);

sequelize.authenticate()
    .then(() => {
        console.log('Postgresql Connected.');
    })
    .catch(err => {
        console.log('Postgresql Connection Error.');
    });

module.exports = sequelize;
