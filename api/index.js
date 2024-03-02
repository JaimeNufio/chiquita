const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
const { chatgpt, server } = require('../config.json') ?? require(`${process.env.CONFIG_FILE}`)
const cors = require('cors')
const db = require('./db')
const app = express();


db.createPool()
app.use(cors())
app.use(express.json())

const configuration = new Configuration({
    organization: chatgpt.organizationID,
    apiKey: chatgpt.APIKey,
});
openAI = new OpenAIApi(configuration);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-origin", "*")
    res.setHeader('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})

app.get('/', async (req,res)=>{
    return res.send('hello world.')
})

app.post('/new-message', async  (req,res)=>{
    try {
        db.doQuery('INSERT into messages (messageid, userid, guildid, channelid, timestamp, text) \
        VALUES($1, $2, $3, $4, $5, $6)',
        req.body)

        return res.send('New Message Stored')
    } catch {

    }
})

app.post('/new-nickname', async (req,res)=>{
    try {
        db.doQuery('INSERT into nicknames (oldname,newname,renamer,renamed,guildid,timestamp) \
        VALUES($1, $2, $3, $4, $5, $6)',
        req.body)
        return res.send('Posted')
    } catch {

    }
})

app.post('/chatgpt', async (req,res)=>{

    try{

        const response = await openAI.createChatCompletion({
            model:'gpt-3.5-turbo',
            messages: [{
                    role:'user',
                    content: req.body.text
                    }],
        })

        // throw SyntaxError
        return res.send({text:response.data.choices[0].message.content})


    }catch (err){
        console.log(err)
        res.send({text:"Some error occured! "+err})
    }
})

app.listen(server.port, () =>
  console.log(`Example app listening on port ${server.port}!`),
);