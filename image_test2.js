var fs = require('fs'),
    PNG = require('pngjs').PNG;

var base = [];

fs.createReadStream('images/google.png')
.pipe(new PNG({
    filterType: 4
}))
.on('parsed', function() {

    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            base[idx] = this.data[idx];
            base[idx] = this.data[idx+1];
            base[idx] = this.data[idx+2];
            base[idx] = this.data[idx+3];

        }
    }

    this.pack().pipe(fs.createWriteStream('images/out_2.png'));
});

console.log(base);

fs.createReadStream('images/ps.png');
