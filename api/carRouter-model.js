const db = require('../data/dbconfig');

function getCars () {
    return db('cars')
}

function getCarById (id) {
    return db('cars').where({id}).first();
}
async function addCar (car) {
    const [id] = await db('cars').insert(car, 'id')
    return db('cars').where({id}).first()
}

async function updateCar (update, id) {
    return db('cars').where({id}).update(update)
}

function removeCar (id) {
    return db('cars').where('id', id).del()
}

module.exports = {
    getCars,
    getCarById,
    addCar,
    updateCar,
    removeCar
}