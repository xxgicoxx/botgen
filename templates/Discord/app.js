require('dotenv').config();

const { Client } = require('discord.js');

const { MessageController } = require('./app/controllers');

const { discordConfig } = require('./app/configs');

const client = new Client();
const messageController = new MessageController();

client.login(discordConfig.token);

client.on('ready', () => {
  messageController.ready();
});

client.on('message', ($) => {
  if ($.author.bot) return;
  if ($.content.indexOf(discordConfig.prefix) !== 0) return;
  if (!$.guild) return;

  const args = $.content.slice(discordConfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'help':
      messageController.help($);
      break;
    default:
      messageController.handle($);
      break;
  }
});

client.on('guildMemberAdd', ($) => {
  messageController.hello($);
});
