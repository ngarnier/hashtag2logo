// This is server

var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

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
	//Look for the hashtag on twitter

	// Get all users who tweeted on the #

	// Get all the pictures of all the users and put them in a single photo

	//Turn that photo into the logo (merge with handleAttachment)
}

function sendEmail(address){
	//Send the image to that address

}

function save(finalImage, date, address, hash, picFrame){
	//Store in the db the final image with the date when it was created, the address of the requester, the hashtag and the original frame of all users
}


var server = app.listen(3000, function () {
  var host = server.address().address,
  	  port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});