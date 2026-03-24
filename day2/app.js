const http = require('http');


// function reqListner(req , res ) {
    
// }
// http.createServer(reqListner);


// the other way by annonymus function

const server = http.createServer(function (req,res) {

    console.log(req.url,req.method,req.headers);

    res.setHeader('Content-Type','text/html');
    const name ='Amreet';
    let date = new Date().toLocaleDateString();

    res.write('<html>');
    res.write('<body>');
    res.write('<h1> Hello my name is '+name+'and the time is '+date+'</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end(); //ends the response 


    process.exit();// ends the server
    
});

server.listen(3000);