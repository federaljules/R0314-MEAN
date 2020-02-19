var fs = require('fs');

    fs.mkdir('./newdata', (err)=>{
        if(err) throw err;
        console.log('newdata directory made');
    });

    let file1 = fs.readFileSync('example.txt').toString(); 
    
    let file2 = fs.readFileSync('example2.txt').toString();

    fs.writeFileSync('./newdata/combined.txt',"I wrote this! \n" + file1 +"\n"+ file2 +"\n", 'utf8')

    fs.appendFileSync('./newdata/combined.txt', "I wrote this!");

    fs.readFile('./newdata/combined.txt',  (err, data)=>{
        if (err) console.log(err);
        console.log(data.toString());
    })