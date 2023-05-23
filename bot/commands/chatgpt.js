const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios'); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chatgpt')
		.setDescription('Speak with the machine.')
		.addStringOption(option => option.setName('text').setDescription('Message to send ChatGPT.').setRequired(true))
        .addStringOption(option => option.setName('instruction').setDescription('Optional instruction for ChatGPT.').setRequired(false)),
	
        async execute(interaction,client) {
            try{

                interaction.deferReply()

                const text = interaction.options.getString('text')
                const instruction = interaction.options.getString('instruction')
                const body = {
                    text,
                    instruction,
                    name:interaction.member.nickname
                }
                
                let output = ''
                await axios.post('http://localhost:5000/chatgpt', body)
                    .then((res)=>{output = res.data.choices[0].message.content})
                    .catch(err=>{console.log(err)})

                console.log('output',output)


                const fields = [
                    {
                        "name": "Original Text:",
                        "value": `${text}`,
                        "inline": true
                    },
                    {
                        "name": "",
                        "value": ``,
                    }
                ]

                const parts = Math.ceil(output.length/1024)
                
                for (i=0;i<=parts;i++){
                    const snippet = output.slice(i*1024,(i*1024)+1024)
                    console.log(snippet)

                    fields.push(
                        {
                            "name": i>0?'':'ChatGPT',
                            "value": snippet,
                        }
                    )
                }

                if (instruction){
                    fields.unshift({                    
                        "name": "Instruction:",
                        "value": `${instruction}`,
                        "inline": true
                    })
                }

                interaction.editReply( {"embeds": [{
                    "color": 39129,
                    "author": {
                        "name": `via ChatGPT`,
                        "icon_url": `https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png`
                    },
                    fields
                    
                }]})



            }catch (err){
                console.log(err)
            }
        }
}