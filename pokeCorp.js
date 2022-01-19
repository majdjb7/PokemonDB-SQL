const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/poke_corp')
const pokemonsData = require('./mockData.json')
// console.log(pokemonsData)









sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

