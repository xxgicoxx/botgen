class HelpService {
  async help(bot, chat) {
    try {
      let message = '<b>I can help you.\n\nYou can control me by sending these commands:</b>\n';
      const commands = await this._commands();

      commands.forEach((command) => {
        message += `${command.command} - ${command.description}\n`;
      });

      await bot.sendMessage(chat.id, message, { parse_mode: 'html' });
    } catch (error) {
      console.error(error);
    }
  }

  async _commands() {
    return [
      {
        command: '/start',
        description: 'Start',
      }, {
        command: '/help',
        description: 'Help',
      },
    ];
  }
}

module.exports = HelpService;
