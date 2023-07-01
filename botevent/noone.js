module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message, client) {
      console.log(`Message received: ${message.content}`);
      // Add your desired functionality here
    },
  };