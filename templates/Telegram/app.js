require('dotenv').config();

const { TextCommand, Telegram } = require('telegram-node-bot');

const { MessageController } = require('./app/controllers');

const { telegramConfig } = require('./app/configs');

const bot = new Telegram(telegramConfig.token, {
  webAdmin: {
    port: telegramConfig.webAdminPort,
    host: telegramConfig.webAdminHost,
  },
  workers: telegramConfig.workers,
});

bot.router
  .when(new TextCommand('/start', 'start'), new MessageController())
  .when(new TextCommand('/help', 'help'), new MessageController())
  .otherwise(new MessageController());
