var http = require('http');
var fs = require('fs');
http.createServer((req, res)=>{
    
    if(req.url == '/'){
        res.write('Nothing to see here')
    }
    else if(req.url == '/frontpage'){
        res.writeHead(200, {'Content-type': 'text/plain'});
        let frontpage = fs.readFileSync('frontpage.html', 'utf8')
        res.write(frontpage)
    }
    else if(req.url == '/contact'){
        res.writeHead(200, {'Content-type': 'text/html'});
        let contact = fs.readFileSync('contact.html', 'utf8')
        res.write(contact)
    }
    else if(req.url == '/plaintext'){
        res.writeHead(200, {'Content-type': 'text/plain'});
        let txt = fs.readFileSync('example.txt', 'utf8')
        res.write(txt)
    }
    else if(req.url == '/json'){
        res.writeHead(200, {'Content-type': 'text/json'});
        let json = fs.readFileSync('sampledata.json')
        res.write(json)

    }
    
}).listen(8081);

console.log('Serveri aloitettu portilla 8081')

