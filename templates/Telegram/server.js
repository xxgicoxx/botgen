process.env.NTBA_FIX_319 = 1;

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const { telegramConfig } = require('./server/configs');
const { BotController } = require('./server/controllers');

const bot = new TelegramBot(telegramConfig.token, { polling: true });
const botController = new BotController(bot);

botController.handle();
