var express = require('express');
var fs = require('fs');
var app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static('public/demosite'));

app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/list', (req, res) => { 
    res.sendFile(__dirname + '/list.txt')
});

app.get('/jsondata', (req, res) => { 
    var data = require('./exampledata.json');
    var results = '<table border="1"><thead><tr><th>Name</th><th>Email</th><th>Date</th><th>Company</th></tr><thead>';

    for (let i = 0; i < data.length; i++) {
        results += 
        '<tr>' +
        '<td>'+ data[i].Name +'</td>' +
        '<td>'+ data[i].Email +'</td>' +
        '<td>'+ data[i].Date +'</td>' +
        '<td>'+ data[i].Company +'</td>' +
        '</tr>';
    }

    res.send(results)
    res.end('</table>')
});

app.get('/adduser', (req, res)=>{
    res.sendFile(__dirname + '/public/adduser.html');

 })

app.post('/adduser', (req, res) => {
    var data = require('./exampledata.json')

    data.push({
        "Name": req.body.name,
        "Email": req.body.email,
        "Company": req.body.company,
        "Date":new Date()
    })

    var jsonString = JSON.stringify(data);
    fs.writeFile('exampledata.json', jsonString, (err) => {
        if (err) throw err.message;
        console.log('Saved')
})
    
    res.send('Saved data to the file. Visit /jsondata to see the contents and your addition.')
})


   

app.get('*', (req, res) => { 
    res.send('Cant find page!', 404)
});

app.listen(8081, () => {
    console.log(`Example app listening on port 8081!`)
});