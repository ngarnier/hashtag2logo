var fs = require('fs'),
    PNG = require('pngjs').PNG;

// this function will revert And Merge the Photos 
exports.revertAndMerge = function(toRevert, toMerge, resultName) {
    var base = fs.createReadStream(toRevert)

    .pipe(new PNG({
        filterType: 4
    }))

    .on('parsed', function() {

        var up = fs.createReadStream(toMerge)

        .pipe(new PNG({
            filterType: 4
        }))

        .on('parsed', function() {

            for (var y = 0; y < base.height; y++) {
                for (var x = 0; x < base.width; x++) {
                    var idx = (base.width * y + x) << 2;
                    if (base.data[idx+3] <= 2){
                        // if it is transparent
                        base.data[idx] = 0;
                        base.data[idx+1] = 0;
                        base.data[idx+2] = 0;
                        base.data[idx+3] = 0;
                    }
                    else{
                        //otheerwise put it transparent
                        base.data[idx] = up.data[idx];
                        base.data[idx+1] = 32;
                        base.data[idx+2] = up.data[idx + 2];
                        base.data[idx+3] = up.data[idx + 3];
                    }
                }
            }

            base.pack().pipe(fs.createWriteStream(resultName));
            console.log("Reverting & merging " + toRevert + "with" + toMerge);
        });

    });
};
