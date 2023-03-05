const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rename')
		.setDescription('Rename another user.')
		.addUserOption(option => option.setName('target').setDescription('The user to rename.').setRequired(true))
        .addStringOption(option => option.setName('nickname').setDescription('The nickname to apply.').setRequired(true)),
	
        async execute(interaction) {

            try{
            const target = interaction.options.getUser('target');
            const nickname = interaction.options.getString('nickname')
            const oldNickname = (await interaction.guild.members.fetch(target.id)).nickname

            if (nickname.length > 32 ){
                interaction.reply( {"embeds": [{
                    "title": "Error: Nickname too long.",
                    "description": "Can't update username, exceeds character limit of 32.",
                    "color": 15879747,
                    "author": {
                        "name": `${interaction.member.nickname}'s command failed.`,
                        "icon_url": `${interaction.user.displayAvatarURL({ dynamic: true })}`
                    },
                    "thumbnail": {
                        "url": `${target.displayAvatarURL({ dynamic: true })}`
                    },
                    "footer": {
                        "text": "If you think this is incorrect, bug Jaime.",
                        "icon_url": ""
                    },
                    "fields": []
                }]})
                return
            }

            if (target.username === interaction.member.user.username){
                interaction.reply( {"embeds": [{
                    "title": "Error: Can't nickname yourself!",
                    "description": "We don't do that here. Try renaming someone else instead.",
                    "color": 15879747,
                    "author": {
                        "name": `${interaction.member.nickname}'s command failed.`,
                        "icon_url": `${interaction.user.displayAvatarURL({ dynamic: true })}`
                    },
                    "thumbnail": {
                        "url": `${target.displayAvatarURL({ dynamic: true })}`
                    },
                    "footer": {
                        "text": "If you think this is incorrect, bug Jaime.",
                        "icon_url": ""
                    },
                    "fields": []
                }]})
                return
            }

            userInGuild = (await interaction.guild.members.fetch(target.id)).setNickname(nickname)
            // console.log(userInGuild)
            interaction.reply( {"embeds": [{
                // "title": "Error: Nickname too long.",
                // "description": "Can't update username, exceeds character limit of 32.",
                "color": 39129,
                "author": {
                    "name": `${interaction.member.nickname} renamed ${target.username}`,
                    "icon_url": `${interaction.user.displayAvatarURL({ dynamic: true })}`
                },
                "thumbnail": {
                    "url": `${target.displayAvatarURL({ dynamic: true })}`
                },
                // "footer": {
                //     "text": "If you think this is incorrect, bug Jaime.",
                //     "icon_url": ""
                // },
                "fields": [
                    {
                        "name": "New Name",
                        "value": `${nickname}`,
                        "inline": true
                    },
                    {
                        "name": "Old Name",
                        "value": `${oldNickname}`,
                        "inline": true
                    }
                ]
            }]})

            }catch (err){
                // interaction.reply(err)
                console.log(err)
            }
        },
};