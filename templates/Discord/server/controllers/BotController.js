const { discordConfig } = require('../configs');
const { HelpService } = require('../services');

const helpService = new HelpService();

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  async handle() {
    this.bot.login(discordConfig.token);

    this.bot.on('messageCreate', (message) => {
      if (message.author.bot) return;
      if (message.content.indexOf(discordConfig.prefix) !== 0) return;
      if (!message.guild) return;

      const args = message.content.slice(discordConfig.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      switch (command) {
        case 'help':
          helpService.help(message);
          break;
        default:
          helpService.help(message);
          break;
      }
    });
  }
}

module.exports = BotController;
