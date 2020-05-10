var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const url = "mongodb+srv://admin:admin1234@cluster0-xmd4c.mongodb.net/maat?retryWrites=true&w=majority"

let schema = new Schema({
    nimi: String,
    pääkaupunki: String,                    //Luo uusi mongoose schema
    asukasluku: Number,
    lippu: String,
    coords: {lat: Number, lon: Number},
    info: String,
},{collection: 'euroopan_maat'})            // Määritä collectioniksi oikea

const Item = mongoose.model("Item",schema);

// Luo yheteys moduli tietokantaan -------------------------------------------------------------
exports.connect = function(){

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})             

let db = mongoose.connection;

db.on('error', function(err){console.log(err + " Error")});

db.once('open', function(){
    console.log('Connected')
})
}

// Luo yheteys moduli tietokantaan -------------------------------------------------------------



// Luo itemin lisäys moduli  -------------------------------------------------------------

exports.addItem = function(nimi, pkaup, asluku, lippu, lat, lon, info){

    let newItem = new Item({
        nimi: nimi,
        pääkaupunki: pkaup,
        asukasluku: asluku,
        lippu: lippu,                       // Määritä parametreinä saadut tiedot schemaan ja tallenna schema tietokantaan
        coords: {lat: lat,lon: lon},
        info: info
    })

    newItem.save(function (err, res) { 
        if(err) console.log(err);

        console.log("Item lisätty" + res)
        mongoose.connection.close()

     })
}

// Luo itemin lisäys moduli  -------------------------------------------------------------





// Luo itemin päivitys moduli  -------------------------------------------------------------
exports.updateItem = function(id,nimi,pkaup, asluku, lippu, lat, lon, info){

    let obj = {
        nimi: nimi,
        pääkaupunki: pkaup,
        asukasluku: asluku,                      // Määritä parametreinä saadut tiedot schemaan ja päivitä kenttien tiedot jotka eivät ole tyhjhiä
        lippu: lippu,
        coords: {lat: lat,lon: lon},
        info: info
    };

    Object.keys(obj).forEach(i => (!obj[i]) && delete obj[i]);              // Jos parametrillä ei ole arvoa niin poista se item objektista

    Item.findByIdAndUpdate(id, obj, {new: true}, function (err, res){
        if(err) console.log(err);
    })
    

}

// Luo itemin päivitys moduli  -------------------------------------------------------------






// Hae tietokannan kaikki itemit modulin avulla  -------------------------------------------------------------

 exports.findItem = function(result){

  Item.find({},function(err, res){
      if(err) console.log(err);
      return result(res);
  })
  
  }
// Hae tietokannan kaikki itemit modulin avulla  -------------------------------------------------------------



// Hae maan nimen avulla tietokannasta  -------------------------------------------------------------

  exports.findSearch = function(val, result){

       
        //   Item.findOne({_id: val},function(err, res){
        //       if(err) console.log(err);                  
                                                                // Nimellä haku sopi paremmin appiini kuin ID:llä haku, tässä on kuitenkin ID haku kommentoituna
        //       return result(res);
        //   })
   
       Item.findOne({nimi: val},function(err, res){
           if(err) console.log(err);

           return result(res);
       })
  
    }
// Hae maan nimen avulla tietokannasta  -------------------------------------------------------------
 


// Poista item ID:n avulla  -------------------------------------------------------------

exports.deleteItemById = function (id, result) {


    Item.findByIdAndDelete(id, function(err,res){
        if(err) console.log(err);

        return result(res);
        
    })
    

  }
// Poista item ID:n avulla  -------------------------------------------------------------
