const MongoClient  = require('mongodb').MongoClient;
var state = {
    db: null,
  }
const url = "mongodb+srv://admin:admin123@cluster0-eld1e.mongodb.net/test?retryWrites=true&w=majority"

const dbName = "nodeMongo";


exports.addUser = function(username, psw)
{
    
    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology:true }, function (err, client) {
    
            if(err){
                console.log(" Tapahtui virhe!")
            }else{
                console.log("Yhteys onnistutut!")
                const db = client.db(dbName);
    
               db.collection("users").insertOne({username: username, password: psw})
               
               console.log("Toimii")
              
            }
    
            
            
        })

}

exports.connect = function (url, done) { 

    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology:true }, function (err, client) {
        if(state.client) return done()

        if(err){
            console.log(" Tapahtui virhe!")
        }else{
            console.log("Yhteys onnistutut!")
            const db = client.db(dbName);
        }
    })

 }


exports.getUser = function(username, psw)
{


    
    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology:true }, function (err, client) {
    
            if(err){
                console.log(" Tapahtui virhe!")
            }else{
                console.log("Yhteys onnistutut!")
                const db = client.db(dbName);
                
                let response =  db.collection("users").findOne({username: username, password: psw}, {username: 1, password:1}, function(err, res){
                    if (err) console.log(err);
                    
                    if(res == null){
                        console.log("Väärä salasana tai sähköposti!")
                    }else{
                       res;
                    }
                    
                })
            //    response.forEach(e =>{
            //     if(e.username == username && e.password == psw){
                   
            //        // window.location = '/loggedin';

            //         console.log( e.username +" "+ e.password)
            //     }else{
                    
            //     }
               //})
                
               
               
               console.log("Saatu tietoa!") 
              
            }
    
            
            
        })

}

exports.deleteAll = function () { 

    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology:true }, function (err, client) {
    
        if(err){
            console.log(" Tapahtui virhe!")
        }else{
            console.log("Yhteys onnistutut!")
            const db = client.db(dbName);
            
            db.collection('users').deleteMany({})
           
           
           console.log("Saatu tietoa ") 
          
        }

        
        
    })

 }