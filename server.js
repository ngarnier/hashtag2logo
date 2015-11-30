import express from 'express';
import bodyParser from 'body-parser';
import handleParse from './handleParse';

express()
  .use(bodyParser.json())
  .use(bodyParser.json({limit: '2mb'}))
  .use(bodyParser.urlencoded({extended: true}))
  .post('/parse', handleParse)
  .listen(3003)
