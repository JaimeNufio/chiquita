const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits } = require('discord.js');
const { token, silentGuildIds } = require('../config.json');
const { exit } = require('node:process');

const client = new Client({
     intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] });

client.once('ready', () => {
	console.log('Ready!');
    client.application.commands.set([])
    console.log('Cleared command list.')
    exit(0)
});

client.login(token);