var gm = require('gm'),
	gmstate,
	gmstateRow,
	m;

// this will handle the mosaic
exports.createMosaic = function(imagesArray, callback) {
   console.log("picFrame.png en train d'etre creer");
   m = Math.floor(Math.sqrt(imagesArray.length));

	var mosaic = function() {
		gmstateRow = gm("0.png");

		for (var i = 1; i < m; i++) {
			gmstateRow.append(i+".png");
			console.log("appending" + i+".png");
		}

		// finally write out the file asynchronously
		gmstateRow.write('picFrame.png', function (err) {
			if (err) {
				console.log(err);
			}
		});	
	}

	for (var k = 0; k < m; k++) {

		gmstate = gm(imagesArray[0+k*m]);

		for (var i = 1+k*m; i < m+k*m; i++) {
			gmstate.append(imagesArray[i], true);
		}
		// finally write out the file asynchronously

		gmstate.write(k +'.png', function (err) {
			// cereqte a counter
			console.log("writing " + k + " image");

			if (err) {
				console.log(err);
			}
			else
				mosaic();
		});

	}	
   callback();
};
