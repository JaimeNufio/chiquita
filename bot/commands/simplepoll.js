const { SlashCommandBuilder } = require('discord.js')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('simple-poll')
    .setDescription('Simple Yes/No poll.')
    .addStringOption(option => option
      .setName('prompt')
      .setDescription('Question text.')
      .setRequired(true)
    ),

  async execute (interaction, client = null) {
    const prompt = interaction.options.getString('prompt')

    const msg = await interaction.reply({
      embeds: [{
        title: `Quick Poll Started by @${capitalizeFirstLetter(interaction.member.nickname ?? interaction.member.user.username)}`,
        description: `*"${prompt}"*`,
        color: 0xd4453b,
        "thumbnail": {
          "url":`${interaction.user.displayAvatarURL({ dynamic: true })}`
        },
			}],
      fetchReply: true
    })

    msg.react('👍')
    msg.react('👎')    
  }
}
