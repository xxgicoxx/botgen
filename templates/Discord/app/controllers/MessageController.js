const { MessageService } = require('../services');

const messageService = new MessageService();

class MessageController {
  async handle($) {
    messageService.handle($);
  }

  async ready() {
    messageService.ready();
  }

  async hello($) {
    messageService.hello($);
  }

  async help($) {
    messageService.help($);
  }
}

module.exports = MessageController;
