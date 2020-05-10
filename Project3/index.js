const express = require('express');
const db = require('./modules/database.js')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 3000;
const url = require('url')
var cors = require('cors')
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())


app.use('/api', express.static('api_doc.html'))         // APIn reittiohjeet


app.get('/api/getall', (req, res) => {
    db.connect()
    db.findItem(function(result){           // Hae kaikki itemit tietokannasta, findItem löytyy database.js tiedostosta modulina

      
        res.status(200).json(result)
        res.end()
    })
    
})

app.get('/api/get/:val', (req, res) => {
    db.connect()
    let val = req.params.val;

    db.findSearch(val,function(result){             // Hae maan nimen perusteella itemit tietokannasta, findSearch löytyy database.js tiedostosta modulina
        
        res.status(200).json(result)
        res.end()
    })
})


//app.use('/api/add', express.static('add_form.html'));
app.post('/api/add', (req, res) => {
   // let params = url.parse(req.body, true).query;
    let params = req.body;

    let maa = params.maa;
    let pkaupunki = params.paakaupunki;
    let asluku = params.asluku;
    let lippu  = params.lippu;
    let coordsLat = params.lat;                                 // Lisää uusi item tietokantaan. Kerää tiedot POST kutsusta req.body avulla, addItem löytyy database.js tiedostosta modulina
    let coordsLon = params.lon;
    let moreInfo = params.info;

    db.connect()
    db.addItem(maa, pkaupunki, asluku, lippu, coordsLat, coordsLon, moreInfo)
    res.status(200).json("Added "+maa)
    res.end()
})

app.put('/api/update/:id', function (req,res){
    let id  = req.params.id;
   // let params = url.parse(req.url, true).query;

    let params = req.body;

    let maa = params.maa;
    let pkaupunki = params.paakaupunki;
    let asluku = params.asluku;
    let lippu  = params.lippu;                              // Päivitä itemiä tietokannassa ID:n avulla, updateItem löytyy database.js tiedostosta modulina
    let coordsLat = params.lat;
    let coordsLon = params.lon;
    let moreInfo = params.info;

    db.updateItem(id,maa, pkaupunki, asluku, lippu, coordsLat, coordsLon, moreInfo,function(result){

    res.status(200).json(result)
    console.log(result)
    
});

})


app.delete('/api/delete/:id', (req, res) => {

    db.connect()
    let id = req.params.id;
    db.deleteItemById(id, function(result){
         if (result == null) {
            res.status(200).json("Item with id: "+id+" not found")          // Poista item tietokannasta ID:n avulla, deleteItemById löytyy database.js tiedostosta modulina
        }else{
            res.json("Deleted "+id+" where name was "+ result.nimi)
        }    
    })
})




app.listen(PORT, () => console.log(`Example app listening'!`))