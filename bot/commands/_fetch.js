const { SlashCommandBuilder, MessageAttachment } = require('discord.js')
const fs = require('fs')
const https = require('https')
const twitterGetUrl = require('twitter-url-direct')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fetch')
    .setDescription('Fetch TWITTER video at a url and post it as a file instead.')
    .addStringOption(option => option.setName('url').setDescription('Url of video file.').setRequired(true))
    .addBooleanOption(option => option.setName('spoiler').setDescription('Is this a spoiler?.').setRequired(false))
    .addStringOption(option => option.setName('caption').setDescription('Text to go along with the video.').setRequired(false)),

  async execute (interaction) {
    try {
      // https://twitter.com/BlueEyed1412/status/1585020957898723328?s=20&t=WogKezvjXE0Ya27GcH6wXw

      interaction.deferReply()

      urlArg = interaction.options.getString('url')
      shouldSpoiler = interaction.options.getString('spoiler')
      const url = urlArg.split('?')[0]

      const twitterResponse = await twitterGetUrl(url)

      fileUrl = twitterResponse.download[twitterResponse.download.length - 1].url

      splitOnHttps = twitterResponse.tweet_user.text.split('https://t.co')
      text = splitOnHttps[0]
      linkToTweet = `https://t.co${splitOnHttps[1]}`

      const downloadName = `twitterVid-${uuidv4()}.mp4`
      const file = fs.createWriteStream(downloadName)

      const request = await https.get(fileUrl, async function (response) {
        console.log(response.headers)
        console.log(response.headers['content-length'])

        if (response.headers['content-length'] > 8000000) {
          await interaction.editReply({
            content: `Downloaded file is too big for discord, here's the original link: ${linkToTweet}` +
                        interaction.options.getString('caption')
              ? `${interaction.user}: ${interaction.options.getString('caption')}`
              : ''
          })
          return
        }

        response.pipe(file)

        // after download completed close filestream
        await file.on('finish', async () => {
          file.close()
          console.log('Download Completed')

          await interaction.editReply({
            content: interaction.options.getString('caption') ? `${interaction.user}: ${interaction.options.getString('caption')}` : '',
            embeds: [
              {
                author: {
                  name: `@${twitterResponse.tweet_user.username}`,
                  icon_url: 'https://www.torqlite.com/wp-content/uploads/2017/02/60414c58e954d7236837248225e0216f_new-twitter-logo-vector-eps-twitter-logo-clipart_518-518.png'
                  // 'link':
                },
                title: `${twitterResponse.tweet_user.name}`,
                description: `${text}`,
                thumbnail: {
                  url: 'attachment://assets/logos/twitter.png'
                },
                footer: {
                  text: linkToTweet
                }
              }
            ],
            // content:`**@${response.tweet_user.username}**:\n${response.tweet_user.text}`,

            files: [{
              attachment: `./${downloadName}`,
              name: `${shouldSpoiler ? 'SPOILER_' : ''}TwitterVideo.mp4`
            }]
          })
          await fs.unlinkSync(`./${downloadName}`)
        })
      })
    } catch (e) {

    }
  }
}
