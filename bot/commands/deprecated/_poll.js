const { SlashCommandBuilder, MessageAttachment } = require('discord.js')
const storageManager = require('../utils/modifyJson')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Quickly build a poll.')
    .addStringOption(option => option.setName('prompt').setDescription('Question text.').setRequired(true))
    .addStringOption(option => option.setName('option1').setDescription('Option 1.').setRequired(true))
    .addStringOption(option => option.setName('option2').setDescription('Option 2.').setRequired(true)),

  async execute (interaction) {
    const prompt = interaction.options.getString('prompt')
    const option1 = interaction.options.getString('option1')
    const option2 = interaction.options.getString('option2')

    // storageManager.readJson('../db/pollStates.json')
    console.log('created', interaction.id)

    await interaction.reply(
      {
        components: [
					  {
            type: 1,
            components: [
						  {
                style: 1,
                label: `${option1}`,
                custom_id: 'poll_button_0',
                disabled: false,
                type: 2
						  },
						  {
                style: 1,
                label: `${option2}`,
                custom_id: 'poll_button_1',
                disabled: false,
                type: 2
						  }
            ]
					  }
        ],
        embeds: [
					  {
            type: 'rich',
            title: `**POLL: ${prompt}** `,
            description: `${option1}\n${option2}`,
            color: 0x00FFFF
					  }
        ]
				  }
    )
  }
}
