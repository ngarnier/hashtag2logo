// This is the server receiving 
var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	credentials = require('./credentials.js'),
	reverterMerger = require('./reverterMerger.js'),
	imageSizer = require('./imageSizer.js'),
	mosaic = require('./mosaic2.js'),
	Twit = require('twit'),
	T = new Twit(credentials.twitter),
	fs = require('fs'),
	imagesArray = [],
	amqp = require('amqplib/callback_api');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello You!');
});

// this is where the Parse API should make a post reques
app.post('/parse/', function (req, res) {
	res.send("ok");

	var hashtag = req.body.Subject,
		sender = req.body.Sender,
		attachmentb64 = req.body.Attachment1;

	// to handle the case without atachment

	var timestamp = Math.floor(new Date() / 1000),
	new_attachement_name = hashtag + "_" + timestamp + ".png";

	var task = {
		hashtag : hashtag,
		sender : sender,
		attachmentb64 : attachmentb64,
		timestamp : timestamp,
		new_attachement_name : new_attachement_name
	};

	console.log("--> Mail received from " + sender + " with the hashtag #" + hashtag);

	amqp.connect('amqp://localhost', function(err, conn) {
		conn.createChannel(function(err, ch) {
			var q = 'task_queue';

			ch.assertQueue(q, {durable: true});
			ch.sendToQueue(q, new Buffer(JSON.stringify(task)), {persistent: true});
			console.log(" [x] Sent '%s'", JSON.stringify(task));
		});
	});
});



var server = app.listen(3000, function () {
  var host = server.address().address,
  	  port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});