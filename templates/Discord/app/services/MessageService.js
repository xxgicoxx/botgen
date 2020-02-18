class MessageService {
  async handle($) {
    $.reply('Command not found');
  }

  async ready() {
    console.log('Discord bot online!');
  }

  async hello($) {
    const channel = $.guild.channels.find((ch) => ch.name === 'member-log');

    if (!channel) return;

    channel.send(`Welcome to the server, ${$}`);
  }

  async help($) {
    $.reply('Add message to help users');
  }
}

module.exports = MessageService;
