var express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var app = express();
var fs = require('fs');
let ejs = require('ejs');

const PORT = process.env.PORT || 3000; // Heroku PORT variable

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/views/pages/css"))



app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/guestbook', (req, res) => {

  fs.readFile('guestbook.json','utf8', (err, data) => {
    if (err) throw err;
    let book = JSON.parse(data);

   res.render('pages/guestbook', {data: book})
 })
})

app.get('/newmessage', (req, res) => {
  res.render('pages/new')
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
  res.render('pages/ajaxmessage');
})

app.post('/ajaxmessage', (req, res) => {

  var json = require('./guestbook.json');

  json.push(req.body)
  
  var jsonString = JSON.stringify(json);
  fs.writeFileSync('guestbook.json', jsonString, (err) => {
      if (err) throw err.message;
      console.log('Saved')
    })
    res.send(jsonString)
})


app.listen(PORT, () => console.log(`Example app listening on port 8081!`))
