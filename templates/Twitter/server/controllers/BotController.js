const { TweetsService } = require('../services');

const tweetsService = new TweetsService();

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  async handle() {
    const stream = this.bot.stream('statuses/filter', {
      track: 'twitter-bot',
    });

    stream.on('tweet', async (tweet) => {
      tweetsService.message(this.bot, tweet);
    });
  }
}

module.exports = BotController;
