const { Direct } = require('../models');

class MessageService {
  async response(twitter, $) {
    try {
      const text = 'Beep Bop, i\'m a bot';

      twitter.post('direct_messages/events/new', new Direct({ user: $.user.id_str, text }).toJson());
    } catch (ex) {
      console.error(ex);

      twitter.post('direct_messages/events/new', new Direct({ user: $.user.id_str, text: 'Error, try again later' }).toJson());
    }
  }
}

module.exports = MessageService;
