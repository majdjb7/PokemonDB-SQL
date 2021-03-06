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

const addTrainer = async function() {
    let trainersList = []
    pokemonsData.forEach(p=> {
        p.ownedBy.map(async o => {
            if(!trainersList.includes(o.name)) {
                trainersList.push(o.name)
                let name = o.name
                let townName = o.town
                let townQuery = `SELECT tn_id FROM town WHERE t_name='${townName}'`
                let result = await sequelize.query(townQuery)
                let town_id = result[0][0].tn_id
                let trainerQuery = `INSERT INTO trainer VALUES (null, '${name}', ${town_id})`;
                let newResult = await sequelize.query(trainerQuery)
                return newResult[0]
            }
        })
    }) 
    }

const linkPokemonWithTrainers = async function() {
    pokemonsData.forEach(p=> {
        let poke_id = p.id
        p.ownedBy.map(async o => {
            let owner = o.name
            let ownerQuery = `SELECT tr_id FROM trainer WHERE t_name='${owner}'`
            let result = await sequelize.query(ownerQuery)
            let owner_ids = result[0]
            console.log(owner_ids)
            // owner_ids.forEach(async o_id => {
                
            // })
            let pokemonAndTrainerQuery = `INSERT INTO pokemon_trainer VALUES ('${poke_id}', ${owner_ids[0].tr_id})`;
            let newResult = await sequelize.query(pokemonAndTrainerQuery)
            return newResult[0]  
        })
    })
}

function addAllData() {
    addTowns()
        .then(addTrainer())
    addTypes()
        .then(addPokemon())
}

// addAllData()
//     .then(linkPokemonWithTrainers())


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })