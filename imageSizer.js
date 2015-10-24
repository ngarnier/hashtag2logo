
// this function will take the two photos and try to get the best size possible for them
exports.syncImageSizes = function(logo, picFrame, outputName){
	gm(picFrame)
	.size(function (err, sizePicFrame) {
		if (!err){
			gm(logo)	
			.resizeExact(sizePicFrame.width, sizePicFrame.width)
			.write(outputName, function (err) {
  				if (!err) console.log('done');
  			});
		}
		else
			console.log('error while calling size on picFrame in function syncImageSizes');
	});
}
