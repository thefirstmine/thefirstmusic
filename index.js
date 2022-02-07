require('dotenv').config();

const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: ['GUILDS' , 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
});

module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

require("./handler")(client);

client.login(process.env.TOKEN)