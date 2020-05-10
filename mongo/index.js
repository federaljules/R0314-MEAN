const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./modules/db.js');



app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));




app.get('/', (req, res) => {
    res.sendFile('form.html', {root: __dirname})

    //db.getUser();

})

app.post('/', (req, res) => {

    db.addUser(req.body.email, req.body.password);

    res.redirect("/");
   
})

app.get('/login', (req,res)=>{

    res.sendFile('login.html', {root: __dirname})



})

app.post('/login', (req,res)=>{

  let userIfno =  db.getUser(req.body.email, req.body.password)

  console.log(req)

})
    

app.get('/delete', (res, req) => {
    db.deleteAll();
})





app.listen(port, () => console.log(`Example app listening on port port!`))