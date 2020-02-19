

var http = require('http');
var fs = require('fs');
http.createServer((req, res)=>{
    res.writeHead(200, {'Content-type': 'text/json'});

    let json = require('./sampledata.json', 'utf8');

    json.push({
        "name": "John Doe",
        "age": "52",
        "company": "Laurea",
        "address": "Ratatie 22"
    })

    delete json[0]

    fs.writeFileSync('dataset.json', JSON.stringify(json, null, 1));

    res.write(JSON.stringify(json, 1, 1))

    
    
}).listen(8081);

console.log('Serveri aloitettu portilla 8081')
