

        var http = require('http');
        var fs = require('fs');
        http.createServer((req, res)=>{
            res.writeHead(200, {'Content-type': 'text/html'});
            let data = require('./sampledata.json');

            for(let i=0;i<data.length;i++){
                console.log(data[i].name);
                console.log(data[i].age);
                console.log(data[i].company);
                console.log(data[i].address);
            }
    
            for(let i=0;i<data.length;i++){
                res.write('<table " border="1">\n<tr>')
                res.write("<td>"+data[i].name+"</td>");
                res.write("<td>"+data[i].age+"</td>");
                res.write("<td>"+data[i].company+"</td>");
                res.write("<td>"+data[i].address+"</td>");
                res.write('<tr>\n</table>')
            }
            
        }).listen(8082);