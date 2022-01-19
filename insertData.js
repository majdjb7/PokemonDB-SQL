const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/poke_corp')
const pokemonsData = require('./mockData.json')

const addTowns = async function() {
    let townsList = []
    pokemonsData.forEach(p => {
            p.ownedBy.forEach(async owner => {
                let town = owner.town
                if(!townsList.includes(town)) {
                    townsList.push(town)
                    let townQuery = `INSERT INTO town VALUES (null, '${town}')`;
                    let result = await sequelize.query(townQuery);
                    return result[0]
                }
            })
    })
}
// addTowns()

const addTypes = async function() {
    let typesList = []
    pokemonsData.forEach(async p => {
        let type = p.type
        if(!typesList.includes(type)) {
            typesList.push(type)
            let typeQuery = `INSERT INTO pokemon_type VALUES (null, '${type}')`;
            let result = sequelize.query(typeQuery)
            // console.log(result[0])
            return result[0]
        }

    })
}

// addTypes()

const addPokemon = async function() {
    pokemonsData.forEach(async p=> {
        let poke_type = p.type
        let typeQuery = `SELECT t_id FROM pokemon_type WHERE type='${poke_type}'`
        let result = await sequelize.query(typeQuery)
        let poke_type_id = result[0][0].t_id
        let poke_id = p.id
        let poke_name = p.name
        let poke_height = p.height
        let poke_weight = p.weight
        let pokeQuery = `INSERT INTO pokemon VALUES (${poke_id}, '${poke_name}', ${poke_height}, ${poke_weight}, ${poke_type_id})`;
        let newResult = sequelize.query(pokeQuery)
        return newResult[0]
    })
}
// addPokemon()

const addTrainer = async function() {
    pokemonsData.forEach(p=> {
        p.ownedBy.map(async o => {
            let name = o.name
            let townName = o.town
            let townQuery = `SELECT tn_id FROM town WHERE t_name='${townName}'`
            let result = await sequelize.query(townQuery)
            let town_id = result[0][0].tn_id
            let trainerQuery = `INSERT INTO trainer VALUES (null, '${name}', ${town_id})`;
            let newResult = await sequelize.query(trainerQuery)
            return newResult[0]
        })
    }) 
    }
// addTrainer()

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })