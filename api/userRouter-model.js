const db = require('../data/dbconfig');

function getAllUsers (){
    return db('users');
}

function getUserById (id) {
    return db('users').where({id}).first();
}

async function addUser(user) {
    const [id] = await db('users').insert(user, 'id');
    return db('users').where({id}).first();
}

function updateUser(update, id) {
    return db('users').where({id}).update(update)
}

function removeUser(id) {
    return db('users').where({id}).delete()
}

function getUserCars(id) {
    return db('cars as c').join('users as u', 'u.id', 'c.user_id').select('u.name', 'c.id', 'c.car', 'c.year', 'c.color', 'c.clean').where('u.id',id)
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser,
    getUserCars
}