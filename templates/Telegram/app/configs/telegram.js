const telegram = {
  token: process.env.TELEGRAM_TOKEN,
  webAdminPort: process.env.WEB_ADMIN_PORT,
  webAdminHost: process.env.WEB_ADMIN_HOST,
  workers: process.env.WORKERS,
};

module.exports = telegram;
