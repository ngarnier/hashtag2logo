import Mailjet from 'node-mailjet';
import {mailjet as credentials} from './credentials';
import fs from 'fs';

console.log('okok')

let client = new Mailjet(credentials.apikey, credentials.apisecret);

console.log('okok')

export default function sendEmail (hashtag, sender, attachment) {
  let email = {};

  email['Subject'] = hashtag;
  email['FromEmail'] = credentials.sender;
  email['FromName'] = 'Hashtag 2 Logo';
  email['Text-part'] = 'Ready!';
  email['Attachments'] = [{content: fs.readFileSync(attachment).toString('base64'), filename: 'output.png', 'Content-Type': 'image/png'}];
  email['Recipients'] = [{Email: sender}, {Email: 'ngarnier@mailjet.com'}, {Email: 'gbadi@mailjet.com'}];

  client.post('send').request(email, (err, response, body) => {
    console.log (err, response.statusCode, body);
  })
}
