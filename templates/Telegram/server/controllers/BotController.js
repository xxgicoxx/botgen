const { telegramConfig } = require('../configs');

const {
  HelpService,
} = require('../services');

const helpService = new HelpService();

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  async handle() {
    try {
      this.bot.on('message', (message) => {
        const command = message.text ? message.text.replace(telegramConfig.username, '') : message.text;

        switch (command) {
          case '/start':
            helpService.help(this.bot, message.chat);
            break;
          case '/help':
            helpService.help(this.bot, message.chat);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = BotController;
