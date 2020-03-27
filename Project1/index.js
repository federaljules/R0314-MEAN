var express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var app = express();
var fs = require('fs');

const PORT = process.env.PORT || 3000; // Heroku PORT variable

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static('www'))

app.use('/guestbook', express.static('guestbook.html'), (req, res) => {
  res.set('Content-Type', 'text/html');
  let head = fs.readFileSync('www/guestbook.html');
    res.write(head)

  fs.readFile('guestbook.json','utf8', (err, data) => {
    if (err) throw err;
    let book = JSON.parse(data);
    
    for(let i=0; i<book.length; i++){
      let id = book[i].id;
      let name = book[i].username;
      let country = book[i].country;
      let msg = book[i].message;
      
      res.write(`<tr>
        <td>`+name+`</td>
        <td>`+country+`</td>
        <td>`+msg+`</td>
        </tr>`
      )}

    res.end('</tbody></table></body></html>');
});
  
})

app.get('/newmessage', (req, res) => {
  res.sendFile(__dirname + '/www/form.html');
});


app.post('/newmessage', (req, res)=>{

  var json = require('./guestbook.json');
  var username = req.body.username;
  var country = req.body.country;
  var message = req.body.message;

  json.push({

    "username": username,
    "country": country,
    "date": new Date(),
    "message": message

  })

  var jsonString = JSON.stringify(json);
  fs.writeFile('guestbook.json', jsonString, (err) => {
      if (err) throw err.message;
  res.redirect('/newmessage')
})
  
})


    app.get('/ajaxmessage', (req, res) => {
      res.sendFile(__dirname + '/www/formAjax.html');
      
    });

app.post('/ajaxmessage', (req, res) => {
  
        var json = require('./guestbook.json');

        json.push(req.body)
        
        var jsonString = JSON.stringify(json);
        fs.writeFileSync('guestbook.json', jsonString, (err) => {
            if (err) throw err.message;
            console.log('Saved')
          })

          res.send(jsonString);
  
})



app.listen(PORT, () => console.log(`Example app listening on port `+PORT+`!`))
