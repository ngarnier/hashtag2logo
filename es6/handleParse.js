
import gm from 'gm';
import fs from 'fs';
import twitter from './twitter';
import mosaic from './mosaic';
import partial from './partial';
import merge from '../reverterMerger';
import sendEmail from './sendEmail';

const SIZE = 1000;
const _ = undefined;

export default function handleParse (req, res) {

  const body          = req.body
        , hashtag     = body.Subject
        , sender      = body.Sender
        , attachment  = body.Attachment1;

  twitter(hashtag)
    .then(partial(mosaic, _, SIZE, (e, file) => {
      if (e) throw e;

      let filename = `${Math.floor(new Date() / 1000)}.png`
          , attachmentName = `./attachments/${filename}`
          , outputName = `./outputs/${filename}`
          , send = partial(sendEmail, hashtag, sender, outputName)

      fs.writeFile(attachmentName, attachment, 'base64', (err) => {
        merge(attachmentName, file, outputName, send);
      });

    }))
    .catch(e => console.log(e));
}

handleParse({
  body: {
    Subject: 'mailjet',
    Sender: '',
    Attachment1: '',
  }
});
