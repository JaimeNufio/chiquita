const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express();

db.createPool()
app.use(cors())
app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-origin", "*")
    res.setHeader('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})

app.get('/',(req,res)=>{
    return res.send('hello world.')
})

app.post('/new-message',(req,res)=>{
    db.doQuery('INSERT into messages (messageid, userid, guildid, channelid, timestamp, text) \
    VALUES($1, $2, $3, $4, $5, $6)',
    req.body)

    return res.send('New Message Stored')
})

app.post('/new-nickname',(req,res)=>{
    db.doQuery('INSERT into nicknames (oldname,newname,renamer,renamed,guildid,timestamp) \
    VALUES($1, $2, $3, $4, $5, $6)',
    req.body)
    return res.send('Posted')
})

app.listen(5000, () =>
  console.log(`Example app listening on port 5000!`),
);