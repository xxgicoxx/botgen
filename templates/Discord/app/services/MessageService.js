class MessageService {
  async handle($) {
    try {
      const message = 'Command not found';

      $.reply(message);
    } catch (ex) {
      console.error(ex);
    }
  }

  async ready() {
    try {
      const message = 'Discord bot online!';

      console.log(message);
    } catch (ex) {
      console.error(ex);
    }
  }

  async hello($) {
    try {
      const channel = $.guild.channels.find((ch) => ch.name === 'member-log');

      if (!channel) return;

      channel.send(`Welcome to the server, ${$}`);
    } catch (ex) {
      console.error(ex);
    }
  }

  async help($) {
    try {
      const message = 'I can help you.\n\nYou can control me by sending these commands:\n\n/help - command list';

      $.reply(message);
    } catch (ex) {
      console.error(ex);
    }
  }
}

module.exports = MessageService;
