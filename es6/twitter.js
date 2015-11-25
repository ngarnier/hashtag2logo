
import Twitter from 'twit';
import {twitter as credentials} from './credentials';

const TWITTER_PAGES = 3;

const flatten = v => v.constructor == Array ?
  Array.prototype.concat.apply([], v.map(flatten)) : [v];

let client = new Twitter(credentials);

function* getTwitterPages (q, number) {
  let cursor = null
      , payload = {q, count: 100};

  while (number--) {
    if (cursor)
      payload.cursor = cursor;

    yield new Promise((resolve, reject) => {
      client.get('search/tweets', payload, (err, data) => {
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
      .then(statuses =>
          resolve(flatten(statuses)
            .map(s => s.user.profile_image_url))
            .filter(u => u.indexOf('.gif') === -1))
      .catch(e => reject(e));
  });
}
