require('dotenv').config();

const Twit = require('twit');

const { MessageController } = require('./app/controllers');

const { twitterConfig } = require('./app/configs');

const twitter = new Twit(twitterConfig);
const messageController = new MessageController();

const stream = twitter.stream('statuses/filter', {
  track: 'twitter-bot',
});

stream.on('tweet', async ($) => {
  messageController.message(twitter, $);
});
