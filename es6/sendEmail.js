
import Mailjet from 'node-mailjet';
import fs from 'fs';

let client = new Mailjet(process.env['MJ_APIKEY_PUBLIC'], process.env['MJ_APIKEY_PRIVATE']);

export default function sendEmail (hashtag, sender, attachment) {
  let email = {};

  email['Subject'] = hashtag;
  email['FromEmail'] = 'gbadi@student.42.fr';
  email['FromName'] = 'Mailjet';
  email['Html-part'] = 'Ready!';
  email['Attachments'] = [{content: fs.readFileSync(attachment).toString('base64'), filename: 'output.png', 'Content-Type': 'image/png'}];
  email['Recipients'] = [{Email: sender}];

  client.get('send').request(email, (err, response, body) => console.log(err || body));
}
