const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const config = require('./config.json');


const client = new Client({ intents: [new Discord.IntentsBitField(32767)] });

client.commands = new Collection();

// Global Variables
const prefix = config.prefix;
const serverId = config.server_id;
const ownerRoleId = config.owner_role_id;
const staffRoleId = config.staff_role_id;
const moderatorRoleId = config.moderator_role_id;
const memberRoleId = config.member_role_id;
const generalChannelId = config.general_channel_id;

client.login(config.token);

// Command and Event Handlers
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// Load command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Load bot event files
const eventFiles = fs.readdirSync('./botevent').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./botevent/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Bot Ready Event
client.once('ready', () => {
  console.log('Bot is ready!');
});

// Message Event
client.on('message', message => {
  //if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  //if (!command) return;

  try {
    console.log(message)
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.author.send('An error occurred while executing the command. Please check the logs for more information.');
  }
});

client.login(config.token);
