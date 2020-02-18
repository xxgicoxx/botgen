# BotGen
CLI to generate bots for Discord, Telegram and Twitter.

<p align="center">
  <img src="https://i.imgur.com/6ZqP10F.png">
</p>

### Installation
````
npm install botgen -g
````

### Example
```bash
botgen                  # questions to generate new bot

botgen Discord          # generate new Discord bot
botgen Telegram         # generate new Telegram bot
botgen Twitter          # generate new Twitter bot

botgen -h               # all available commands and options
botgen Telegram -y      # generate new Telegram bot with default options
botgen Twitter -y -g    # generate new Twitter bot with default options and git init
botgen Discord -i       # generate new Discord bot and automatically install dependencies
```

### Project configs
All projects contains [dotenv](https://github.com/motdotla/dotenv) for configurations

### Eslint
All projects contains [ESLint](https://github.com/eslint/eslint) with [Airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)

### Built With
* [Node.js](https://nodejs.org/en/)

### Authors
* **Giovani de Oliveira** - [xxgicoxx](https://github.com/xxgicoxx)

### Acknowledgments
* [discord.js](https://github.com/discordjs/discord.js/) - Node.js module for creating Discord bots
* [telegram-node-bot](https://github.com/Naltox/telegram-node-bot/) - Node.js module for creating Telegram bots
* [twit](https://github.com/ttezel/twit/) - Node.js module for creating Twitter bots
* [FlatIcon](https://www.flaticon.com/) - Icon
