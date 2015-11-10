
import Mailjet from 'node-mailjet';

let client = new Mailjet(process.env['MJ_APIKEY_PUBLIC'], process.env['MJ_APIKEY_PRIVATE']);

export default function sendEmail (hashtag, sender, attachment) {
  let email = {};

  email['Subject'] = hashtag;
  email['FromEmail'] = 'gbadi@student.42.fr';
  email['FromName'] = 'Mailjet';
  email['Html-part'] = 'Ready!';
  email['Attachments'] = [{content: fs.readFileSync(attachment), filename: 'output.png', 'Content-Type': 'image/png'}];
  email['Recipients'] = [{Email: sender}];

  client.request('send').post(email, (err) => err ? console.log(err) : null);
}
