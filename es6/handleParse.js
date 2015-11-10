
import gm from 'gm';
import twitter from './twitter';
import partial from './partial';
import mosaic from './mosaic';
import merge from '../reverterMerger';

const SIZE = 1000;
const _ = undefined;

export default function handleParse (req, res) {

  const body          = req.body
        , hashtag     = body.Subject
        , sender      = body.Sender
        , attachment  = body.Attachment1
        , logo        = './apple.png';

  let test = twitter(hashtag)
    .then(partial(mosaic, _, SIZE, (e, file) => {
      if (e) throw e;
      merge(logo, file, './output1.png');
    }))
    .catch(e => console.log(e));
}

handleParse({
  body: {
    Subject: 'DotGo',
    Sender: '',
    Attachment1: '',
  }
});
