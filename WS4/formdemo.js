const express = require('express')
const fs = require('fs')
const app = express()
const port = 8081
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));

app.get('/adduser', (req, res)=>{
    res.sendFile(__dirname + '/public/adduser.html');
})

app.post('/adduser', (req, res) => {
var data = "";
    data += req.body.name +"\n";
    data += req.body.email +"\n";
    data += req.body.company +"\n";
    console.log(data);
    res.send(data)
})

app.listen(port, () => console.log(`Example app listening on port port!`))