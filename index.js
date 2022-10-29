const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, commandBuilders } = require('discord.js');
const { token, silentGuildIds } = require('./config.json');
const reactions = require('./triggered/reactions')

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

    // for deleteing all commands.
    // client.application.commands.set([])
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
    console.log(interaction.commandName)
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', async message => {
    if(message.author.bot) return; // no bots
    // if (silentGuildIds.includes(message.guild.id)) return //checking per-reaction,

    reactions.checkAll(client,message)
})

client.login(token);