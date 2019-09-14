'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelSecret: 'f7f1e00de8b2a07c96f4000460065d01',
    channelAccessToken: 'QquMiMarkiHFLRXCl7BiFTPd8AaD1nDbLVDwjW25eEkQK1FfqGDDmo2FMMzoN1O0qQZjX2y4o432PO80+/i+xrVncu7Z6l8l7pD9Ahi07O5H9CG8smmEHcDkYWX0yTt5dwgnRm7fZQtx9BKzEOm1kAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', function(req, res) {
  // herokuのルートディレクトリにアクセスした時に表示される
  res.send('<h1>LINE BOT の開発セミナーへようこそ</h1>');
});

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

exports.app = functions.https.onRequest(app);
