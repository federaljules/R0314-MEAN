var express = require('express');
var app = express();
// app.use(express.static('public/demosite'));

app.get('/', (req, res) => { 
    res.send('Hello World!')
});

app.listen(8081, () => {
    console.log(`Example app listening on port 8081!`)
});