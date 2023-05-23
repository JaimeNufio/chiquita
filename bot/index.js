const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, commandBuilders } = require('discord.js');
const { token, silentGuildIds,mainGuild } = require('../config.json');
const storageManager = require('./utils/modifyJson');
const reactions = require('./triggered/reactions')
const axios = require('axios');

const client = new Client({
     intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && !(file.startsWith('_')));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
	
	client.commands.set(command.data.name, command);
    console.log("Added",command.data.name);
}

client.once('ready', () => {
	console.log('Ready!');

    client.channels.cache.get(mainGuild.channelId).send('Bot Started.');

    // for deleteing all commands.
    // client.application.commands.set([])
});

client.on('interactionCreate', async interaction => {

    console.log("clicked",interaction.id)

	if (interaction.isChatInputCommand()){
        const command = client.commands.get(interaction.commandName);
        console.log(interaction.commandName)
        if (!command) return;

        try {
            await command.execute(interaction,client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.on('messageCreate', async message => {

    if(message.author.bot) return; // no bots

    // console.log(message)

    try {
        const messageData  = {
            messageid:message.id,
            userid:message.author.id,
            guildid:message.guildId,
            channelid:message.channelId,
            timestamp:message.createdTimestamp,
            text:message.content,
            // originalMessage:message
        }

        await axios.post('http://localhost:5000/new-message', messageData)
    } catch (error){ }

    reactions.checkAll(client,message,silentGuildIds)
})

client.login(token);
