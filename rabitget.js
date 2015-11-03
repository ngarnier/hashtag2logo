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


amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';

    ch.assertQueue(q, {durable: true});

    ch.prefetch(1);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

    ch.consume(q, function(msg) {
		var encoded_payload = unescape(msg.content);
        var payload = JSON.parse(encoded_payload);

    	console.log(payload);

		handleHashtag(payload.hashtag, function(){
			require("fs").writeFile("attachment/" + payload.new_attachement_name, payload.attachmentb64, 'base64', function(err) {
				if (err){
					console.log(err);
				}
				else{
					handleAttachment(payload.new_attachement_name);
				}
			});
		});

		console.log(" [x] Done" + payload.hashtag);
		ch.ack(msg);
    }, {noAck: false});
  });
});



// This function handle the attachment
function handleAttachment(att){
	//I am handling the attachment which is in PNG

	imageSizer.syncImageSizes("attachment/" + att, 'picFrame.png', 'resized/'+att, function(){
		reverterMerger.revertAndMerge('resized/'+att, 'picFrame.png', 'output/'+att);
	});

	// I need to resize the photo in order to cut unused space
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

				T.get('search/tweets', { cursor:data3.next_cursor, q: hash, count: 100 }, function(err, data4, response) {
					//Store all the pics of all users who tweeted in imagesArray (fourth page/400)
					if (err) {
			  			console.log(err);
			  			return;
			  		}

					T.get('search/tweets', { cursor:data4.next_cursor, q: hash, count: 100 }, function(err, data5, response) {
						//Store all the pics of all users who tweeted in imagesArray (fifth page/500)
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
						for (var i = 0; i < data4.statuses.length; i++) {
							imagesArray.push(data4.statuses[i].user.profile_image_url);
						};
						for (var i = 0; i < data5.statuses.length; i++) {
							imagesArray.push(data5.statuses[i].user.profile_image_url);
						console.log(imagesArray.length);
						mosaic.createMosaic(imagesArray, callback);
						};
					});
				});
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