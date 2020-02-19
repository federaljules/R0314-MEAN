var fs = require('fs');

fs.mkdir('./newdata', (err)=>{
    if(err) throw err;
    console.log('newdata directory made');
});

//fs.rmdir('./newdata', (err)=>{
//    if(err) throw err;
//    console.log('newdata directory removed');
//});