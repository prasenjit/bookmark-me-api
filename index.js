import express from 'express';
import http from 'http';
import logger from 'morgan';
import cors from 'cors';

import './config/mongo.js';

const port = 5000;

const app = express();
app.use(cors());
app.options('*', cors());
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint does not exist'
  });
});

const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  console.log(`Listening on port: ${port}`);
})