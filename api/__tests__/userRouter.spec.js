const db = require('../../data/dbconfig');
const request = require('supertest');
const server = require('../server');

describe('userRouter', ()=>{
    describe('get', ()=>{
        it('should respond with 200 on success', async ()=>{
             const res = await request(server).get('/api/users');
             expect(res.status).toBe(200)
        })
        it('should respond with json object', async ()=>{
            const res = await request(server).get('/api/users');
            expect(res.type).toBe('application/json')
        })
        it('should respond with 200 on get by id', async ()=>{
            const res = await request(server).get('/api/users/1');
            expect(res.status).toBe(200)
        })
        it('should respond with user object', async ()=>{
            const res = await request(server).get('/api/users/1');
            expect(res.body).toHaveProperty('name')
        })
    })
    describe('post new user', ()=>{
        beforeEach(async () => {
            await db('users').truncate()
            await db('users').insert({name:'Sam'})
            await db('users').insert({name:'Bob'})
            await db('users').insert({name:'Kim'})
        })
        const newUser = {name:'Brian'};

        it('should return 201 on success', async ()=>{
            const res = await request(server).post('/api/users').send(newUser);
            expect(res.status).toBe(201)
        })
        it('should return the name of the new user', async ()=>{
            const res = await request(server).post('/api/users').send(newUser);
            expect(res.body.data.name).toBe('Brian')
        })
    })

    describe('edit user', ()=>{
        beforeEach(async () => {
            await db('users').truncate()
            await db('users').insert({name:'Sam'})
            await db('users').insert({name:'Bob'})
            await db('users').insert({name:'Kim'})
        })
        
        it('should respond with 201 on success', async ()=>{
            const res = await request(server).put('/api/users/1').send({name:'Brian'});
            expect(res.status).toBe(201)
        })
        it('should return the id of the log that was changed', async ()=>{
            const res = await request(server).put('/api/users/2').send({name:'Brian'});
            expect(res.statusType).toBe(2) 
        })
    })
    
    describe('delete user', ()=>{
        beforeEach(async () => {
            await db('users').truncate()
            await db('users').insert({name:'Sam'})
            await db('users').insert({name:'Bob'})
            await db('users').insert({name:'Kim'})
        })

        it('should respond with 200 on success', async ()=>{
            const res = await request(server).del('/api/users/3')
            expect(res.status).toBe(200)
        })
        it('should shorten the length of users array by 1', async ()=>{
            await request(server).del('/api/users/3')
            const users = await request(server).get('/api/users')
            expect(users.body).toHaveLength(2)
        })
        
    })

})