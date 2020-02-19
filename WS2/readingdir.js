var fs = require('fs');

fs.readdir('./', (err, data)=>{
    if(err) throw err;
    console.log(data)
})