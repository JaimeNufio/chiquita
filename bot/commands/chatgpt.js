const { SlashCommandBuilder } = require('discord.js')
const { chatgpt } = require('../../config.json') ?? require(`${process.env.CONFIG_FILE}`)
const axios = require('axios')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chatgpt')
    .setDescription('Commune with the Digital God.')
    .addStringOption(option => option
      .setName('prompt')
      .setDescription('Your prompt.')
      .setRequired(true))
    .addIntegerOption(option => option
      .setName('tokens')
      .setDescription('The amount of tokens to use. (A token is a word, basically.)')
      .setMinValue(25)
      .setMaxValue(1000))
    .addStringOption(option => option
      .setName('model')
      .setDescription('Version of ChatGPT to use. I recommend 3.5 Turbo.')
      .addChoices(
        {name:"GPT 3.5 (turbo)", value:"gpt-3.5-turbo"},
        {name:"GPT 4 (turbo)", value:"gpt-4-turbo-preview"},
        {name:"GPT 4", value:"gpt-4"}
      )
    ),

    
  async execute (interaction, client) {
    try {
      interaction.deferReply()

      const prompt = interaction.options.getString('prompt') ?? "hello world"
      const model =  interaction.options.getString('model') ?? "gpt-3.5-turbo"
      const tokenMax = interaction.options.getInteger('tokens') ?? 100

      const data = {
        // prompt,
        max_tokens: tokenMax,
        temperature: 0.7,
        n: 1,
        "model": model,
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
          {
            "role": "user",
            "content": prompt
          }
        ]
      }

      const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${chatgpt.APIKey}`
        }
    }

      let output = ''
      let dataRecieved = {}
      await axios.post('https://api.openai.com/v1/chat/completions', data, config)
        .then((res) => { output = res.data.choices[0].message.content??"Test prompt"; dataRecieved = res.data })
        .catch(err => { console.log('error...') })


      interaction.editReply({
        embeds: [
          {
            "type": "rich",
            "title": `${capitalizeFirstLetter(interaction.member.nickname ?? interaction.member.user.username)} Asked:`,
            "description": `"${prompt}"`,
            "color": interaction.member.user.accentColor ?? 0x48bdf0,
            "inline":true,
            "thumbnail": {
              "url":`${interaction.user.displayAvatarURL({ dynamic: true })}`
            },
            "footer": {
              "text": `Prompt uses ${prompt.split(' ').length} tokens.`,
              // "icon_url": `https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png`,
              "url": `https://platform.openai.com/docs/guides/prompt-engineering`
            },
          },
          {
            "type": "rich",
            "title": `ChatGPT Replied:`,
            "description": `${output}`,
            "color": 0x70efb8,
            "inline":true,
            "thumbnail": {
              url:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png'
            },
            "footer": {
              "text": `Via ChatGPT | Model: "${model}" | Using a maximum of ${tokenMax} tokens.`,
              // "icon_url": `https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png`,
              "url": `https://platform.openai.com/docs/guides/prompt-engineering`
            },
          }
        ]
      })
    } catch (err) {
      console.log(err)
    }
  }
}
