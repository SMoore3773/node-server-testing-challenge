const router = require('express').Router();
const db = require('./carRouter-model');

router.get('/', (req,res)=>{
    db.getCars()
    .then(cars => res.status(200).json(cars))
    .catch(err => res.status(500).json({error:"error gettig cars", reason:err.message}))
})

router.get('/:id', (req,res)=>{
    const {id} = req.params
    db.getCarById(id)
    .then(car => res.status(200).json(car))
    .catch(err => res.status(500).json({error:"error getting car", reason:err.message}))
})

router.post('/', (req,res)=>{
    const newCar = req.body;
    db.addCar(newCar)
    .then(car => res.status(201).json(car))
    .catch(err => res.status(500).json({error:"error adding new car", reason:err.message}))
})

router.put('/:id', (req,res)=>{
    const {id} = req.params;
    const changes = req.body;
    db.updateCar(changes, id)
    .then(car => res.status(201).json(car))
    .catch(err => res.status(500).json({error:"error updating car", reason:err.message}))
})

router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    db.removeCar(id)
    .then(car => res.status(200).json({message:"car removed", data:car}))
    .catch(err => res.status(500).json({error:"error deleting car", reason:err.message}))
})

module.exports = router;