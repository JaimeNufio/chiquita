const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, guildIds, token } = require('../config.json');


const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && !file.startsWith('_'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

//delete all commands
// guildIds.map( (guildId)=>{
//     rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log(`Successfully deleted all guild commands on guild ${guildId}.`))
// 	.catch(console.error);
// })

guildIds.map( (guildId)=>{
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log(`Successfully registered application commands on guild ${guildId}.`))
        .catch()
        //.catch(console.error);
})