const { Direct } = require('../models');

class TweetsService {
  async message(bot, tweet) {
    try {
      const message = `Hello, ${tweet.user.name}`;

      bot.post('direct_messages/events/new', new Direct({
        user: tweet.user.id_str,
        text: message,
      }).toJson());
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = TweetsService;
