
import fs from 'fs';
import gm from 'gm';
import chunk from './chunk';

/*
  Takes the array of images by default, sets the width to 500 by default and
  callback empty
*/
export default function mosaic (array, width = 500, callback = () => 0) {
  /*
    Sets an gm instance.
    m is the number of images on 1 side of the mosaic to make sure we have a
    square
  */
  const output = `output_${new Date()/1000}.png`;
  let image = gm()
      , m = Math.floor(Math.sqrt(array.length));

  let lines = chunk(array, m)
      /*
        Create each line with the m images. true in gm.append
        appends the images horizontally
      */
      .map(line =>
        line.reduce((p, c) => p.append(c, true), gm()))
      .map((gmLine, index) => {
        return new Promise((resolve) => {
          let file = `./tmp/${index}_${output}`;
          gmLine.write(file, e => e ? callback(e) : resolve(file));
        });
      });
  console.log(width, '--', m);
  Promise.all(lines)
    .then(files => {
      files
        .reduce((p, c) => p.append(c), gm())
        .resize(width)
        .write('./'+output, () => callback(null, output));
    })
}
