const express = require('express')
const cors = require('cors')
const app = express();

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
    console.log('new msg!')
    return res.send('New Message')
})

app.post('/new-nickname',(req,res)=>{
    return res.send('Posted')
})

app.listen(5000, () =>
  console.log(`Example app listening on port 5000!`),
);