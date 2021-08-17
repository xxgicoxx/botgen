const { discordConfig } = require('../configs');

class HelpService {
  async help(message) {
    try {
      message.reply(`I can help you check servers.\n\nYou can control me by sending these commands:\n\n${discordConfig.prefix} help - Help`);
    } catch (error) {
      console.error(error);

      message.reply('Error, try again later');
    }
  }
}

module.exports = HelpService;
