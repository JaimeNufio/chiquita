import express from 'express';
const app = express();

app.post('/new-nickname',(req,res)=>{
    return res.send('Posted')
})