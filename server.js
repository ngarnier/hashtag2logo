// This is server

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// this is where the Parse API should make a post reques
app.post('/parse/', function (req, res) {
	res.send(req.body);
	console.log(req.body);
});

// This function handle the attachment
function handleAttachment(att){
	//I am handling the attachment which is in PNG

	// I need to resize the photo in order to cut unused space

	// Revert the transparent with white color and the non-transparent in transparent
}

function handleHashtag(hash){

}

function sendEmail(address){

}

function save(finalImage, date, adress, hash, picFrame){

}


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});