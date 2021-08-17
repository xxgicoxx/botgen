require('dotenv').config();

const { Client, Intents } = require('discord.js');

const { BotController } = require('./server/controllers');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const botController = new BotController(client);

botController.handle();
