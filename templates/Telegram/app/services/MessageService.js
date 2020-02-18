class MessageService {
  async handle($) {
    try {
      const message = 'Command not found';

      $.sendMessage(message);
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async help($) {
    try {
      const message = 'Add message to help users';

      $.sendMessage(message);
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }
}

module.exports = MessageService;
