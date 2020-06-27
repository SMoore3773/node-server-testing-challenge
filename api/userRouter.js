const router = require('express').Router();
const db = require('./userRouter-model');

router.get('/', (req,res)=>{
    db.getAllUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({error:'error getting users', reason:err.message}))
})

router.get('/:id', (req,res)=>{
    const {id} = req.params
    db.getUserById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error:"error getting user", reason:err.message}))
})

router.post('/', (req,res)=>{
    const newUser = req.body;
    db.addUser(newUser)
    .then(user => res.status(201).json({data: user}))
    .catch(err => res.status(500).json({error:"error adding new user", reason:err.message}))
})

router.put('/:id', (req,res)=>{
    const {id} = req.params;
    const updates = req.body;
    db.updateUser(updates, id)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({error:"error updating user", reason:err.message}))
})

router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    db.removeUser(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error:"error in deleting user", reason:err.message})) 
})

router.get('/:id/cars', (req,res)=>{
    const {id} = req.params;
    db.getUserCars(id)
    .then(cars => res.status(200).json(cars))
    .catch(err => res.status(500).json({error:"error in gettng user's cars", reason:err.message}))
})

module.exports = router;