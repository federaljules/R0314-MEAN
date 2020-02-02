var http = require("http");
http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/html'});

    response.write(
        
        `
        
        <style>
        
        table, th, tr{
            background-color:grey;
            border:1px solid black;
            font-family:Helvetica;
            color:antiquewhite;
            padding:10px;
        }
        
        </style>

        <table>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
            </tr>
            <tr>
                <th>Matti Meikalainen</th>
                <th>Jejejeetie 12</th>
                <th>Sipoo</th>
            </tr>
            <tr>
                <th>Maija Meikalainen</th>
                <th>Juujuutie 13</th>
                <th>Vantaa</th>
             </tr>
        </table>`
        );

response.end();
}).listen(8081);

console.log('Running at http://127.0.0.1:8081/')