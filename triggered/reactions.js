const { messageLink } = require("discord.js")

class reactions {


    static Yes(msg){
        const regex = new RegExp('^(yes)(\.|!)?$') 
        if (regex.test(msg.content.toLowerCase())){
            msg.react('<:yes:617874534137069569>');
        }
    }

    static No(msg){
        const regex = new RegExp('^(no)(\.|!)?$') 
        if (regex.test(msg.content.toLowerCase())){
            msg.react('<:no:617874534149914624>');
        }
    }

    static Kanye(msg){
        const regex = new RegExp('^(.)*\sye\s(.)*$|(kanye)')
        if (regex.test(msg.content.toLowerCase())){
            msg.react('<:kanye:590902214327795742>')
        }
    }

    static HBD(msg,target){
        const regex = new RegExp('(happy birthday|hbd)')
        if (regex.test(msg.content.toLowerCase())){

            const n = this.randomIntFromInterval(100,120)
            const partyEmojis = ['🎉','✨','🥳','🎈','🎇','🎊','🎆']
            let emojiBlock = ''

            for (let i = 0; i < n; i++){
                emojiBlock+=partyEmojis[Math.floor(Math.random()*partyEmojis.length)]
                
            }

            msg.reply(`***Happy Birthday ${target}!***`+
                `\n${emojiBlock}`)
        }        
    }


    static checkAll(client,msg) {

        // if server isn't in 'silent' list

        this.Yes(msg)
        this.No(msg)
        this.Kanye(msg)

        const target = msg.mentions.users.first()
        if (target === undefined) return

        this.HBD(msg,target)


    }


    //util

    static  randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

}

module.exports = reactions


/*

 #No
    pattern = re.compile("^(:)?[nN][oO](.)?(:)?$")
    if pattern.search(text):
        emoji = get(bot.emojis, name='no')
        await ctx.add_reaction(emoji)

    #Yes
    pattern = re.compile("^(:)?[Yy][e][s](.)?(:)?$")
    if pattern.search(text):
        emoji = get(bot.emojis, name='yes')
        await ctx.add_reaction(emoji)

    #kanye
    pattern = re.compile("(.)*\sye\s(.)*")
    if pattern.search(text):
        emoji = get(bot.emojis, name='kanye')
        await ctx.add_reaction(emoji)

    #gamers
    pattern = re.compile("(.)*gamers(.)*")
    if pattern.search(text):
        emoji = get(bot.emojis, name='gamer')
        await ctx.add_reaction(emoji)

    #ayy
    pattern = re.compile("^ay(y)+$")
    if pattern.search(text):
        emoji = get(bot.emojis, name='glory')
        await ctx.add_reaction(emoji)

    #hrm
    pattern = re.compile("^h(r)?(m)*(n)*$")
    if pattern.search(text):
        emoji = "🤔" #get(bot.emojis, name='thinking')
        await ctx.add_reaction(emoji)

    #VOTE:
    pattern = re.compile("^vote(.)*:")
    if pattern.search(text):
        emoji = "👍" #get(bot.emojis, name='thumbsup')
        await ctx.add_reaction(emoji)
        emoji = "👎" #get(bot.emojis, name='thumbsdown')
        await ctx.add_reaction(emoji)

    #amish
    pattern = re.compile("AM(I)+(S)+H")
    if pattern.search(text):
        emoji = get(bot.emojis, name='NadeRave')
        await ctx.add_reaction(emoji)
        emoji = get(bot.emojis, name='partykirby')
        await ctx.add_reaction(emoji)
        emoji = get(bot.emojis, name='pepedance')
        await ctx.add_reaction(emoji)
        emoji = get(bot.emojis, name='spin')
        await ctx.add_reaction(emoji)
        emoji = get(bot.emojis, name='NRGparty')
        await ctx.add_reaction(emoji)
        emoji = get(bot.emojis, name='birbparty')
        await ctx.add_reaction(emoji)
        emoji = get(bot.emojis, name='NRGparty')
        await ctx.add_reaction(emoji)

    #merry christmas
    pattern = re.compile("(merry|happy|feliz)\s(christmas|navidad|holidays)")
    if pattern.search(text.lower()):
        print("Trigger Merry Christmas")
        itt = int((random.random()*20) + 100)
        sum = "**"+text.upper()+"!**\n"
        items = ['🎅','❄️','❄️','❄️','👼','☃️','☃️','🧝','🎄','🎁','🎁','🎁','🌟','🌟','🌟','🧝','🤶']
        songs = [
           "https://www.youtube.com/watch?v=yXQViqx6GMY",
           "https://www.youtube.com/watch?v=E8gmARGvPlI",
           "https://www.youtube.com/watch?v=0bhsXykXxfg",
           "https://www.youtube.com/watch?v=AN_R4pR1hck",
           "https://www.youtube.com/watch?v=y3E1GDSzIak",
           "https://www.youtube.com/watch?v=hLf0-lro8X8",
           "https://www.youtube.com/watch?v=l1wHyMR_SCA",
           "https://www.youtube.com/watch?v=N8NcQzMQN_U"           

        ]
        for i in range(itt):
            sum += random.choice(items)+" "
        
        sum+="\n"+random.choice(songs)
        await ctx.reply(sum)

    pattern = re.compile("(happy)\s(new)\s(year)")
    if pattern.search(text.lower()):
        print("Trigger Happy New Years")
        itt = int((random.random()*20) + 100)
        sum = "**"+text.upper()+"!**\n"
        items = [
            '🎇', '🎊','🎈','🎉','🎆','🍺','🥂'
        ]
        songs = [        

        ]
        for i in range(itt):
            sum += random.choice(items)+" "
        
        await ctx.reply(sum)

        */