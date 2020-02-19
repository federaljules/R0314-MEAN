//var fs = require("fs")
//
//console.log("Program started");
//var data = fs.readFileSync('example.txt');
//console.log(data.toString());
//
//for(var i = 0; i< 15; i++){
//    console.log("Node just goes..")
//}

//var fs = require("fs")
//
//console.log("Program started");
//fs.readFile('example.txt', results);
//
//
//for(var i = 0; i< 15; i++){
//    console.log("Node just goes..")
//}
//
//function results(err, data) { 
//    if (err) return console.error(err);
//    console.log("Results of fileread")
//    console.log(data.toString());
// }

var fs = require('fs');

    fs.readFile('example.txt', (err, data) => {
        if (err) console.log(err.message);
        console.log(data.toString());
    })  



    fs.readFile('example2.txt', (err, data) => {
        if (err) console.log(err.message);
        console.log(data.toString());
    })

    fs.writeFileSync('example2.txt', 'I wrote this!', 'utf8')