var fs = require('fs'),
    PNG = require('pngjs').PNG;

var base = fs.createReadStream('images/ps.png')

.pipe(new PNG({
    filterType: 4
}))

.on('parsed', function() {

    var up = fs.createReadStream('images/google.png')

    .pipe(new PNG({
        filterType: 4
    }))

    .on('parsed', function() {

        for (var y = 0; y < base.height; y++) {
            for (var x = 0; x < base.width; x++) {
                var idx = (base.width * y + x) << 2;

                if (base.data[idx] == 0 && base.data[idx + 1] == 0 && base.data[idx + 2] == 0){
                    base.data[idx] = 255;
                    base.data[idx+1] = 255;
                    base.data[idx+2] = 255;
                    base.data[idx+3] = 255;
                }
                else{
                    base.data[idx] = up.data[idx];
                    base.data[idx+1] = up.data[idx + 1];
                    base.data[idx+2] = up.data[idx + 2];
                    base.data[idx+3] = up.data[idx + 3];
                }
            }
        }

        base.pack().pipe(fs.createWriteStream('images/out_2.png'));
    });

});

