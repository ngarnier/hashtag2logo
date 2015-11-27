import express from 'express';
import bodyParser from 'body-parser';
import handleParse from './handleParse';

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .post('/parse', handleParse)
  .listen(3000)
