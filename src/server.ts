import express from 'express';
import { calculateShippingRouter } from './routes';

const server = express();

/**
 * Middleware
 */

server.use(express.json());

server.get('/', (__, res) => {
  res.send('Server is up!');
});

/**
 * Routers
 */

server.use('/calculate-shipping', calculateShippingRouter);

export default server;
