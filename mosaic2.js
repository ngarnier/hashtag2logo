var gm = require('gm'),
	gmstate,
	gmstateRow,
	m,
	counter = 0;

// this will handle the mosaic
exports.createMosaic = function(imagesArray, callback) {

   m = Math.floor(Math.sqrt(imagesArray.length));

   	var mosaic = function() {
	
	// Vertically append each row of images to create the mosaic
	gmstateRow = gm('frames/0.png');
	console.log("initalizing 0.png");

	for (var i = 1; i < m; i++) {
		gmstateRow.append('frames/' + i+".png");
		console.log("appending " + i+".png");
	}

	// finally write out the file asynchronously
	gmstateRow.write('picFrame.png', function (err) {
		if (err) {
			console.log(err);
		}
	});	
}

	// Create each row of twitter profile pics that will compose the mosaic
	for (var k = 0; k < m; k++) {
		gmstate = gm(imagesArray[0+k*m]); // Initialize each row with a first image
		console.log("creating the " + k + "th row");

		for (var i = 1+k*m; i < m+k*m; i++) {
			gmstate.append(imagesArray[i], true); // horizontally add the following images to create the row
		}
		// finally write out the file asynchronously

		gmstate.write('frames/' + k +'.png', function (err) {
			// create a counter
			counter++;
			console.log(' --- counter:' + counter);

			if (err) {
				console.log(err);
			}
			else {
				if (counter == m) {
				mosaic();
				}
			}
		});

	}
	callback();
};
