const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
const { chatgpt} = require('../config.json');
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
    db.doQuery('INSERT into messages (messageid, userid, guildid, channelid, timestamp, text) \
    VALUES($1, $2, $3, $4, $5, $6)',
    req.body)

    return res.send('New Message Stored')
})

app.post('/new-nickname', async (req,res)=>{
    db.doQuery('INSERT into nicknames (oldname,newname,renamer,renamed,guildid,timestamp) \
    VALUES($1, $2, $3, $4, $5, $6)',
    req.body)
    return res.send('Posted')
})

app.post('/chatgpt', async (req,res)=>{

    try{
        console.log('chatgpt', req.body)

        // const cleanName = req.body.name.replace(/^[a-zA-Z0-9_-]{1,64}$/g,'');

        const response = await openAI.createChatCompletion({
            model:'gpt-3.5-turbo',
            messages: [{
                    role:'user',
                    content: req.body.text
                    }],
        })

        console.log(response.data.choices)

        return res.send({choices:response.data.choices})

    }catch (err){
        console.log(err.response)
    }
})

app.listen(5000, () =>
  console.log(`Example app listening on port 5000!`),
);