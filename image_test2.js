var fs = require('fs'),
    PNG = require('pngjs').PNG;

fs.createReadStream('images/ps.png')

.pipe(new PNG({
    filterType: 4
}))

.on('parsed', function() {

    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            if (this.data[idx] == 0 && this.data[idx + 1] == 0 && this.data[idx + 2] == 0){
                this.data[idx] = 255;
                this.data[idx+1] = 255;
                this.data[idx+2] = 255;
                this.data[idx+3] = 255;
            }
            else{
                this.data[idx] = 255;
                this.data[idx+1] = 255;
                this.data[idx+2] = 255;
                this.data[idx+3] = 0;
            }
        }
    }

    this.pack().pipe(fs.createWriteStream('images/out_2.png'));
});