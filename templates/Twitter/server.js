require('dotenv').config();

const Twit = require('twit');

const { BotController } = require('./server/controllers');

const { twitterConfig } = require('./server/configs');

const bot = new Twit(twitterConfig);
const botController = new BotController(bot);

botController.handle();
