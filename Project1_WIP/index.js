var express = require('express');
const router = express.Router();
var app = express();
var fs = require('fs');

//const PORT = process.env.PORT || 5000; // Heroku PORT variable

const port = 8081;

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
        <td>`+id+`</td>
        <td>`+name+`</td>
        <td>`+country+`</td>
        <td>`+msg+`</td>
        </tr>`
      )}

    res.end('</tbody></table></body></html>');
});
  
})

app.get('/newmessage', (req, res) => {

  res.send('newmessage')

})

app.listen(port, () => console.log(`Example app listening on port port!`))
