
import gm from 'gm';

gm(gm('./images/google.png')).write('./output.js', (err) => console.log (err))
