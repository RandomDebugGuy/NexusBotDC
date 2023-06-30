# Discord Bot

This is a Discord bot that uses a JavaScript API linker. It allows you to configure various settings and execute commands based on user input.

## Configuration

Before running the bot, make sure to set up the `config.json` file with the following variables:

- `token`: Discord bot token. You can obtain this token by creating a new bot application on the Discord Developer Portal.
- `prefix`: Command prefix for the bot. Choose a character or string that will be used as a prefix for bot commands.
- `ownerRoleId`: ID of the role assigned to the bot owner.
- `staffRoleId`: ID of the role assigned to staff members.
- `moderatorRoleId`: ID of the role assigned to moderators.
- `memberRoleId`: ID of the role assigned to regular members.
- `serverId`: ID of the Discord server where the bot will operate.
- `generalChannelId`: ID of the general channel where the bot will send messages.

Make sure to replace the placeholder values with your actual IDs.

## Bot Events

The `botevent` folder contains files that define various bot events. One of the included files is `messageCreate.js`, which triggers when a message is sent in any channel.

Here's an example implementation of `messageCreate.js`:

```javascript
module.exports = {
  name: 'messageCreate',
  once: false,
  execute(message, client) {
    console.log(`Message received: ${message.content}`);
    // Add your desired functionality here
  },
};
