var fs = require('fs'),
    PNG = require('pngjs').PNG;


module.exports = function(toRevert, toMerge, resultName, callback) {
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
                    if (base.data[idx+3] <= 2) {
                        // if it is transparent
                        base.data[idx] = 0;
                        base.data[idx+1] = 0;
                        base.data[idx+2] = 0;
                        base.data[idx+3] = 0;
                    } else {
                        //otherwise make it transparent
                        base.data[idx] = up.data[idx];
                        base.data[idx+1] = up.data[idx + 1];
                        base.data[idx+2] = up.data[idx + 2];
                        base.data[idx+3] = up.data[idx + 3];
                    }
                }
            }

            let a = base.pack().pipe(fs.createWriteStream(resultName));
            a.on('finish', callback);
            console.log("Reverting & merging " + toRevert + " with " + toMerge);
        });

    });
};
