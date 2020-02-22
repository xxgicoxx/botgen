const { Direct } = require('../models');

class MessageService {
  async message(twitter, $) {
    try {
      const message = `Hello, ${$.user.name}`;

      twitter.post('direct_messages/events/new', new Direct({
        user: $.user.id_str,
        text: message,
      }).toJson());
    } catch (ex) {
      console.error(ex);
    }
  }
}

module.exports = MessageService;
