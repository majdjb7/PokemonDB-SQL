const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/poke_corp')
const pokemonsData = require('./mockData.json')
// console.log(pokemonsData)


const getHeaviestPokemon = async function() {
    let query = `SELECT p_name
                FROM pokemon
                WHERE p_weight = (SELECT MAX(p_weight) from pokemon)`
    let result = await sequelize.query(query)
    return result[0][0].p_name
}

const findByType = async function(type) {
    let pokemonList = []
    let typeQuery = `SELECT t_id
                    FROM pokemon_type
                    WHERE type='${type}'`
    let result = await sequelize.query(typeQuery)
    let typeID = result[0][0].t_id

    let allPokemonQuery = `SELECT p_name
                            FROM pokemon
                            WHERE p_type_id=${typeID}`
    let allPokemonResult = await sequelize.query(allPokemonQuery)
    allPokemonResult[0].forEach(p => {
        pokemonList.push(p.p_name)
    });
    return pokemonList
}

const findOwners = async function(pokemon) {
    let allOwners = []
    let pokemonIdQuery = `SELECT p_id
                            FROM pokemon
                            WHERE p_name='${pokemon}'`
    let result = await sequelize.query(pokemonIdQuery)
    let poke_id = result[0][0].p_id

    let ownersQuery = `SELECT tr_id
                        FROM pokemon_trainer
                        WHERE p_id=${poke_id}`
    let trainersResult = await sequelize.query(ownersQuery)

    for(let tr of trainersResult[0]) {
        let trainer_id = tr.tr_id
        let trainerNameQuery = `SELECT t_name
                                FROM trainer
                                WHERE tr_id=${trainer_id}`
        let trainerName = await sequelize.query(trainerNameQuery)
        allOwners.push(trainerName[0][0].t_name)
    }
    return allOwners
}

const findRoster = async function(trainer_name) {
    let pokemonRoster = []
    let getPokemonQuery = `SELECT P.p_name
                            FROM pokemon P, trainer T, pokemon_trainer PT
                            WHERE P.p_id=PT.p_id AND T.tr_id=PT.tr_id AND T.t_name = '${trainer_name}'`
    let result = await sequelize.query(getPokemonQuery)
    for(let pokemon of result[0]) {
        pokemonRoster.push(pokemon.p_name)
    }
    return pokemonRoster
}

// getHeaviestPokemon()

// findByType('ghost')
// .then((result) => console.log(result))

// findOwners('gengar')
//     .then((result) => console.log(result))

// findRoster('Loga')
//     .then((result) => console.log(result))

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

