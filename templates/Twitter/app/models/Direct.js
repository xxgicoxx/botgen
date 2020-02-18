class Direct {
  constructor({ user, text }) {
    this.user = user;
    this.text = text;
  }

  toJson() {
    return {
      event: {
        type: 'message_create',
        message_create: {
          target: {
            recipient_id: this.user,
          },
          message_data: {
            text: this.text || 'Error on create message',
          },
        },
      },
    };
  }
}

module.exports = Direct;
