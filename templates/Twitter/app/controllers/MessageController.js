const { MessageService } = require('../services');

const messageService = new MessageService();

class MessageController {
  async response(twitter, $) {
    messageService.response(twitter, $);
  }
}

module.exports = MessageController;
