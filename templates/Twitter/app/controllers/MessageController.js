const { MessageService } = require('../services');

const messageService = new MessageService();

class MessageController {
  async message(twitter, $) {
    messageService.message(twitter, $);
  }
}

module.exports = MessageController;
