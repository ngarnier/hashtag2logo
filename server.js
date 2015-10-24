// This is server

var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	credentials = require('./credentials.js'),
	Twit = require('twit'),
	T = new Twit(credentials.twitter),
	fs = require('fs'),
	gm = require('gm'),
	imagesArray = [];

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// this is where the Parse API should make a post reques
/*app.post('/parse/', function (req, res) {
	res.send(req.body);
	console.log(req.body);
});*/

// This function handle the attachment
function handleAttachment(att){
	//I am handling the attachment which is in PNG

	// I need to resize the photo in order to cut unused space

	// Revert the transparent with white color and the non-transparent in transparent
}

function handleHashtag(hash){
	//Look for the hashtag on twitter
	T.get('search/tweets', { q: 'aghacks', count: 4 }, function(err, data, response) {
		for (var i = 0; i < data.statuses.length; i++) {
			if (i == 0) {
				imagesArray.push(data.statuses[i].user.profile_image_url);
			}
			else if (data.statuses[i].user.profile_image_url !== data.statuses[i-1].user.profile_image_url) {
				imagesArray.push(data.statuses[i].user.profile_image_url);
			}
		};
  		if (err) {
  			console.log(err);
  		}
  			// Get all the pictures of all the users and put them in a single photo
	// a b c d  ->  ab
//              cd
console.log("ok");
gm()
    .in('-page', '+0+0')  // Custom place for each of the images
    .in(imagesArray[0])
    .in('-page', '+48+0')
    .in(imagesArray[1])
    .in('-page', '+0+48')
    .in(imagesArray[2])
    .in('-page', '+48+48')
    .in(imagesArray[3])
    .minify()  // Halves the size, 512x512 -> 256x256
    .mosaic()  // Merges the images as a matrix
    .write('output.jpg', function (err) {
        if (err) console.log(err);
    });
  		console.log(imagesArray);
	});
	// Get all users who tweeted on the #

	//Turn that photo into the logo (merge with handleAttachment)
}
handleHashtag("hash");

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