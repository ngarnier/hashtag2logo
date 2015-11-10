import express from 'express';
import bodyParser from 'body-parser';
import handleParse from './handleParse';

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .set('views', __dirname + '/views')
  .set('view engine', 'jade')
  .use(express.static(__dirname + '/public'))
  .get('/parse', handleParse)
  .listen(3000)
