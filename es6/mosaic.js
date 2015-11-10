
import fs from 'fs';
import gm from 'gm';
import chunk from './chunk';

export default function mosaic (array, width = 500, callback = () => 0) {
  let image = gm()
      , m = Math.floor(Math.sqrt(array.length));

  array.length = m * m;

  let lines = chunk(array, m)
      .map(line =>
        line.reduce((p, c) => p.append(c, true), gm()))
      .map((gmLine, index) => {
        return new Promise((resolve) => {
          let file = `./tmp/${index}_${Math.floor(new Date() / 1000)}.png`;
          gmLine.write(file, e => e ? callback(e) : resolve(file));
        });
      });

  lines.length = m;

  Promise.all(lines)
    .then(files => {
      files
        .reduce((p, c) => p.append(c), gm())
        .resize(width)
        .write('./output.png', () => callback(null, 'output.png'));
    })
}
