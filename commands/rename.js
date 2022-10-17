const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('rename')
		.setDescription('Rename another user.')
		.addUserOption(option => option.setName('target').setDescription('The user to rename.').setRequired(true))
        .addStringOption(option => option.setName('nickname').setDescription('The nickname to apply.').setRequired(true)),
	
        async execute(interaction) {

            const target = interaction.options.getUser('target');
            const nickname = interaction.options.getString('nickname')
            const oldNickname = interaction.guild.members.fetch(target.id).nickname

            if (nickname.length > 32 ){
                interaction.reply( {"embeds": [{
                    "title": "Error: Nickname too long.",
                    "description": "Can't update username, exceeds character limit of 32.",
                    "color": 15879747,
                    "author": {
                        "name": `${interaction.member.nickname}`,
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
            }

            // try{
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
            // }catch(err){

            // }
            // if (user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
            // return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
        
            // interaction.reply(
            //     {
            //         "embeds": [
            //             {
            //                 "color": 39129,
            //                 "timestamp": "2022-10-17T01:51:35.965Z",
            //                 "url": "https://discord.com",
            //                 "author": {
            //                     "name": "Author name",
            //                     "url": "https://discord.com",
            //                     "icon_url": "https://i.ibb.co/BnfFDYk/2b5dda36047d120000d320aae1c511acd7bbeae9.png"
            //                 },
            //                 "thumbnail": {
            //                     "url": "https://cdn.discordapp.com/embed/avatars/0.png"
            //                 },
            //                 "image": {
            //                     "url": ""
            //                 },
            //                 "footer": {
            //                     "text": "Footer text",
            //                     "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
            //                 },
            //                 "fields": [
            //                     {
            //                         "name": "Field 1, *lorem* **ipsum**, ~~dolor~~",
            //                         "value": "Field value",
            //                         "inline": true
            //                     },
            //                     {
            //                         "name": "Another field",
            //                         "value": "Nope, didn't forget about this",
            //                         "inline": true
            //                     }
            //                 ]
            //             }
            //         ]
            //     }

            // )
        },
};