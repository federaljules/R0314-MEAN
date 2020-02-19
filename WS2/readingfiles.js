var fs = require('fs');

    fs.readFile('example.txt', (err, data) => {
        if (err) console.log(err.message);
        console.log(data.toString());
    })  

    fs.readFile('example2.txt', (err, data) => {
        if (err) console.log(err.message);
        console.log(data.toString());
    })
