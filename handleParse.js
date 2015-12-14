
import gm from 'gm';
import fs from 'fs';
import twitter from './twitter';
import mosaic from './mosaic';
import partial from './partial';
import merge from './reverterMerger';
import sendEmail from './sendEmail';
import sizeOf from 'image-size';

export default function handleParse (req, res) {
  const body          = req.body
        , hashtag     = body.Subject
        , sender      = body.Sender
        , attachment  = body.Attachment1;

  twitter(hashtag)
	.then(array => {

      const filename = `${Math.floor(new Date() / 1000)}.png`
          , attachmentName = `./attachments/${filename}`
          , finalName = `./finals/${filename}`;

      fs.writeFile(attachmentName, attachment, 'base64', (err) => {

		if (err) throw new Error('Write error ' + e.message);

		const size = sizeOf(attachmentName);

		mosaic(array, size.width, (e, file) => {
			if (e) throw e;
			merge(attachmentName, file, finalName, (attachment) => sendEmail(hashtag, sender, finalName));
		});

      });
	})
  /*
    .then(partial(mosaic, null, SIZE, (e, file) => {
      if (e) throw e;

      const filename = `${Math.floor(new Date() / 1000)}.png`
          , attachmentName = `./attachments/${filename}`
          , finalName = `./finals/${filename}`;

      fs.writeFile(attachmentName, attachment, 'base64', (err) => {
        merge(attachmentName, file, finalName, (attachment) => sendEmail(hashtag, sender, finalName));
      });
     res.send('ok');
    }))
	*/
    .catch(e => console.log(e));
}

handleParse({
	body: {
		Sender: 'gbadi@student.42.fr',
		Subject: 'apidays',
		Attachment1: fs.readFileSync('/Users/guillaume/Downloads/blend1.png').toString('base64'),
	}	
}, {
	send() {
		console.log('ok')
	}
});
