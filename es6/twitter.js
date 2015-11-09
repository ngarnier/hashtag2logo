
import Twitter from 'twit';
import {twitter as credentials} from './credentials';

const TWITTER_PAGES = 3;

let flatten = v => v.constructor == Array ?
  Array.prototype.concat.apply([], v.map(flatten)) : [v]

let client = new Twitter(credentials);

function* getTwitterPages (q, number) {
  let cursor = null
      , payload = {q, count: 100};

  while (number--) {
    if (cursor)
      payload.cursor = cursor;

    yield new Promise((resolve, reject) => {
      return resolve(['1', '2', '3', '4', '5']);
      client.get('search/teets', payload, (err, data) => {
        if (err)
          return reject(err);
        cursor = data.next_cursor;
        resolve(data.statuses);
      });
    });
  }
}

export default function getPics (hash) {
  return new Promise((resolve, reject) => {
    Promise.all([...getTwitterPages(hash, TWITTER_PAGES)])
      .catch(reject)
      .then(statuses => {
          resolve(flatten(statuses).map(s => s.user.profile_image_url));
      })));
  });
}
