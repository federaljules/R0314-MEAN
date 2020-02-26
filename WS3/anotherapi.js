var key = "87a8d38f";
var http = require('http');



// http.get('http://www.omdbapi.com/?s=star+wars&apikey='+key+'', (res)=>{

// var json  = JSON.parse(res);
// console.log(json)
// });


var http = require('http');
var https = require('https');
  http.createServer(function (require, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var json;
      var req = https.request('https://api.spacexdata.com/v3/launches/latest', (res)=>{
      var data = '';
    
      res.on('data', (chunk) => {
        data += chunk;
      })
      res.on('end', ()=>{
      json = JSON.parse(data);
        console.log(json);
   
        response.write(`
        
        <div style='margin:auto;width:30%;margin-top:8%'>
        <img style='height:40%;' src='`+json.links.flickr_images[2]+`'/>
        <h2>Latest SpaceX rocket launch information: </h2>
        <h1 style="margin:auto; font-size:30pt;padding:20px;"><img style='width:5%;' src='`+json.links.mission_patch+`'/>&nbsp;&nbsp;&nbsp; `+json.mission_name+` &nbsp;&nbsp;&nbsp;  |  &nbsp;&nbsp;&nbsp; `+json.launch_year+` &nbsp;&nbsp;&nbsp;
        |  &nbsp;&nbsp;&nbsp; `+json.rocket.rocket_name+`</h1>
        <h1></h1>
        <p style='font-size:15pt;'>`+json.details+`</p>
        
        <h2>Join the launch conversation here in <a href='`+json.links.reddit_launch+`'>Reddit !</a></h2>
        </div>
        `)
  response.end();

      })
    });

    req.on('error', (e)=>{
      console.log(e.message)
    });

  req.end();

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');