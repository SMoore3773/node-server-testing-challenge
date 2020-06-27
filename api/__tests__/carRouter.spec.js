const db = require('../../data/dbconfig');
const request = require('supertest');
const server = require('../server');

describe('carRouter', ()=>{
    beforeEach(async () => {
        await db('users').truncate()
        await db('cars').truncate()
        await db('users').insert({name:'Sam'})
        await db('users').insert({name:'Bob'})
        await db('users').insert({name:'Kim'})
        await db('cars').insert({car: 'corvette', year: '2004', color: 'silver', clean: 0, user_id: 1 })
        await db('cars').insert({car: 'prius', year: '2010', color: 'dark gray', clean: 0, user_id: 2})
        await db('cars').insert({car: 'carolla', year: '2009', color: 'white', clean: 0, user_id: 3})
    })

    describe('get', ()=>{
        it('should respond with 200 on success', async ()=>{
            const res = await request(server).get('/api/cars');
             expect(res.status).toBe(200)
        })
        it('should respond with array of json objects', async ()=>{
            const res = await request(server).get('/api/cars');
            expect(res.type).toBe('application/json')
        })
        it('should respond with 200 on get by id', async ()=>{
            const res = await request(server).get('/api/cars/1');
            expect(res.status).toBe(200)
        })
        it('should respond with car object on success', async ()=>{
            const res = await request(server).get('/api/cars/1');
            expect(res.body).toHaveProperty('car')
        })
    })
    
    describe('post', ()=>{
        const newCar = {car: 'protege', year: '1999', color: 'red', clean: 0, user_id: 1}
    
        it('should respond with 201 on success', async ()=>{
            const res = await request(server).post('/api/cars').send(newCar);
            expect(res.status).toBe(201)
        })
        it('should add to return the added car', async ()=>{
            const res = await request(server).post('/api/cars').send(newCar);
            expect(res.body).toHaveProperty('car')
        })
    })
    
    describe('put', ()=>{
        const edit = {clean: 1}
        
        it('should respond with 202 on success', async ()=>{
            const res = await request(server).put('/api/cars/1').send(edit);
            expect(res.status).toBe(201)
        })
        it('should reflect changes to target', async ()=>{
            await request(server).put('/api/cars/1').send(edit);
            const editCarRes = await request(server).get('/api/cars/1')
            expect(editCarRes.body.clean).toBe(1)
        })
    })

    describe('delete', ()=>{
        it('should respond with 200 on seccuess', async ()=>{
            const res = await request(server).del('/api/cars/3');
            expect(res.status).toBe(200);
        })
        it('should shorten the car array by 1', async ()=>{
            await request(server).del('/api/cars/3')
            const updatedCarsRes = await request(server).get('/api/cars');
            expect(updatedCarsRes.body).toHaveLength(2)
        })
    })

})