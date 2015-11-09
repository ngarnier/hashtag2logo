
import fs from 'fs';
import gm from 'gm';

const
    PIC_SIZE = 20
  , LINE_SIZE = 4
  , TILE_WIDTH = 50;

let chunk = (array, size) => {
    var R = [];
    for (var i = 0; i < array.length; i += size)
        R.push(array.slice(i, i + size));
    return R;
}

export default function mosaic (array, callback = () => 0) {
  let image = gm();

  let lines = chunk(array, LINE_SIZE)
      .map(line =>
        line.reduce((p, c) => p.resize(TILE_WIDTH).append(c, true), gm()))
      .map((gmLine, index) => {
        return new Promise((resolve, reject) => {
          let file = `./tmp/${index}.png`;
          gmLine.write(file, e => e ? reject(e) : resolve(file));
        });
      });

  Promise.all(lines)
    .then(files => {
      files
        .reduce((p, c) => p.append(c), gm())
        .write('./output.png', callback);
    })
    .catch(callback);
}
