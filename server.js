// This is the server receiving 
var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	credentials = require('./credentials.js'),
	reverterMerger = require('./reverterMerger.js'),
	imageSizer = require('./imageSizer.js'),
	mosaic = require('./mosaic.js'),
	Twit = require('twit'),
	T = new Twit(credentials.twitter),
	fs = require('fs'),
	imagesArray = [];

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
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

	console.log("--> Mail recived from " + sender + "with the hashtag #" + hashtag);

	handleHashtag(hashtag, function(){
		require("fs").writeFile("attachment/" + new_attachement_name, attachmentb64, 'base64', function(err) {
			if (err){
				console.log(err);
			}
			else{
				handleAttachment(new_attachement_name);
			}
		});
	});

	
});

// This function handle the attachment
function handleAttachment(att){
	//I am handling the attachment which is in PNG

	imageSizer.syncImageSizes("attachment/" + att, 'picFrame.png', 'resized/'+att, function(){
		reverterMerger.revertAndMerge('resized/'+att, 'picFrame.png', 'output/'+att);
	});

	// I need to resize the photo in order to cut unused space

	// Revert the transparent with white color and the non-transparent in transparent
}



function handleHashtag(hash, callback){
	//Look for the hashtag on twitter
	T.get('search/tweets', { q: hash, count: 100 }, function(err, data, response) {
		//Store all the pics of all users who tweeted in imagesArray (first page/100)
		if (err) {
  			console.log(err);
  			return;
  		}

		T.get('search/tweets', { cursor:data.next_cursor, q: hash, count: 100 }, function(err, data2, response) {
			//Store all the pics of all users who tweeted in imagesArray (second page/200)
			if (err) {
	  			console.log(err);
	  			return;
	  		}

			T.get('search/tweets', { cursor:data2.next_cursor, q: hash, count: 100 }, function(err, data3, response) {
				//Store all the pics of all users who tweeted in imagesArray (third page/300)
				if (err) {
		  			console.log(err);
		  			return;
		  		}
				for (var i = 0; i < data.statuses.length; i++) {
					imagesArray.push(data.statuses[i].user.profile_image_url);
				};
				for (var i = 0; i < data2.statuses.length; i++) {
					imagesArray.push(data2.statuses[i].user.profile_image_url);
				};
				for (var i = 0; i < data3.statuses.length; i++) {
					imagesArray.push(data3.statuses[i].user.profile_image_url);
				};
				console.log(imagesArray.length);
				mosaic.createMosaic(imagesArray, callback);
			});
		});
	});
}

function sendEmail(address){
	//Send the image to that address

}


function saveInDb(finalImage, date, address, hash, picFrame){
	//Store in the db the final image with the date when it was created, the address of the requester, the hashtag and the original frame of all users
}


var server = app.listen(3000, function () {
  var host = server.address().address,
  	  port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});