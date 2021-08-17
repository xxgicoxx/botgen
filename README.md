# BotGen
CLI to generate bots for Discord, Telegram and Twitter.

<p align="center">
  <img src="assets/imgs/tool-box.png">
</p>

# Templates
- [x] Discord
- [x] Telegram
- [x] Twitter

# Prerequisites
* [Node.js](https://nodejs.org/en/)

# Installation
````
npm install botgen -g
````

# Example
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

# Built With
* [Node.js](https://nodejs.org/en/)

# Authors
* [xxgicoxx](https://github.com/xxgicoxx)

# Acknowledgments
* [discord.js](https://github.com/discordjs/discord.js/)
* [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/)
* [twit](https://github.com/ttezel/twit/)
* [FlatIcon](https://www.flaticon.com/)
