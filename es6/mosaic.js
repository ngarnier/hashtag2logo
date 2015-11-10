
import fs from 'fs';
import gm from 'gm';
import chunk from './chunk';

export default function mosaic (array, width = 20, callback = () => 0) {
  let image = gm()
      , m = Math.floor(Math.sqrt(array.length))
      , w = width / m;

  let lines = chunk(array, m)
      .map(line =>
        line.reduce((p, c) => p.resize(w).append(c, true), gm()))
      .map((gmLine, index) => {
        return new Promise((resolve) => {
          let file = `./tmp/${index}.png`;
          gmLine.write(file, e => e ? callback(e) : resolve(file));
        });
      });

  Promise.all(lines)
    .then(files => {
      files
        .reduce((p, c) => p.append(c), gm())
        .write('./output.png', () => callback(null, 'output.png'));
    })
}
