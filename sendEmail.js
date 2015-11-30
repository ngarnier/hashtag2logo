import Mailjet from 'node-mailjet';
import {mailjet as credentials} from './credentials';
import fs from 'fs';

let client = new Mailjet(credentials.apikey_public, credentials.apikey_secret);

export default function sendEmail (hashtag, sender, attachment) {
  let email = {};

  email['Subject'] = hashtag;
  email['FromEmail'] = 'logo@shubstache.ovh';
  email['FromName'] = 'Hashtag 2 Logo';
  email['Text-part'] = 'Ready!';
  email['Attachments'] = [{content: fs.readFileSync(attachment).toString('base64'), filename: 'output.png', 'Content-Type': 'image/png'}];
  email['Recipients'] = [{Email: sender}, {Email: 'debug_hashtag2logo@sharma.fr'}];

  client.post('send').request(email, (err, response, body) => {
    console.log (err, response.statusCode, body);
  })
}
