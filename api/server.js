const express = require('express');
const usersRouter = require('./userRouter');
const carsRouter = require('./carRouter');

const server = express();

server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
    res.json({ api: 'server running' })
  });

  module.exports = server;