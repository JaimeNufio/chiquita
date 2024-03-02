const { SlashCommandBuilder } = require('discord.js')
const { server } = require('../../config.json') ?? require(`${process.env.CONFIG_FILE}`)
const axios = require('axios')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chatgpt')
    .setDescription('Prompt the machine.')
    .addStringOption(option => option.setName('text').setDescription('Message to send ChatGPT.').setRequired(true)),
  // .addStringOption(option => option.setName('instruction').setDescription('Optional instruction for ChatGPT.').setRequired(false)),

  async execute (interaction, client) {
    try {
      interaction.deferReply()
      // interaction.editReply('Communicationg with ChatGPT...')

      const text = interaction.options.getString('text')
      const instruction = interaction.options.getString('instruction')
      const body = {
        text,
        instruction,
        name: interaction.member.nickname
      }

      let output = ''
      await axios.post('http://localhost:5000/chatgpt', body)
        .then((res) => { output = res.data.text })
        .catch(err => { console.log(err) })

      const fields = [
        {
          name: `${interaction.user.nickname ?? interaction.user.username} said:`,
          value: `${text}`,
          inline: true
        },
        {
          name: '',
          value: ''
        }
      ]

      const parts = Math.ceil(output.length / 1024)

      for (i = 0; i <= parts; i++) {
        const snippet = output.slice(i * 1024, (i * 1024) + 1024)
        console.log(snippet)

        fields.push(
          {
            name: i > 0 ? '' : 'ChatGPT replied:',
            value: snippet
          }
        )
      }

      if (instruction) {
        fields.unshift({
          name: 'Instruction:',
          value: `${instruction}`,
          inline: true
        })
      }

      interaction.editReply({
        embeds: [{
          color: 39129,
          author: {
            name: `${interaction.user.nickname ?? interaction.user.username} prompted ${client.user.nickname ?? client.user.username} via ChatGPT...`,
            icon_url: `${interaction.user.displayAvatarURL({ dynamic: true })}`
          // "icon_url": `https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png`
          },
          thumbnail: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png'
          },
          fields

        }]
      })
    } catch (err) {
      console.log(err)
    }
  }
}
