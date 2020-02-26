var key = "87a8d38f";
var http = require('http');



// http.get('http://www.omdbapi.com/?s=star+wars&apikey='+key+'', (res)=>{

// var json  = JSON.parse(res);
// console.log(json)
// });


  var http = require('http');
  http.createServer(function (require, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var json;
      var req = http.request('http://www.omdbapi.com/?s=die+hard&apikey=87a8d38f', (res)=>{
      var data = '';
      

      res.on('data', (chunk) => {
        data += chunk;
      })
      res.on('end', ()=>{
      json = JSON.parse(data);
        console.log(json);
        for(let i=0;i<json.Search.length;i++){
        response.write(`<table style='width:600px;text-align:left;border:1px black solid;margin-bottom: 20px;'>
        
        <tr>
          <th >Title</th>
          <th>Released</th>
          <th>Type</th>
  
        </tr>
        <tr>
          <td>`+json.Search[i].Title+`</td>
          <td>`+json.Search[i].Year+`</td>
          <td>`+json.Search[i].Type+`</td>
          <img src=`+json.Search[i].Poster+`/>
        </tr>
      </table>`)
    }
  response.end();

      })
    });

    req.on('error', (e)=>{
      console.log(e.message)
    });

  req.end();

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');