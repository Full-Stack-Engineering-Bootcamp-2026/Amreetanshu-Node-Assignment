const http = require('http');

const server = http.createServer(function (req, res) {

    console.log(req.method, req.url);

    res.setHeader('Content-Type','text/html');

    
    if(req.method === 'GET' && req.url === '/'){

        res.write('<html>');
        res.write('<body>');
        res.write('<h1>Home Page</h1>');
        res.write('<a href="/about">Go to About Page</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();

    }


    if(req.method === 'GET' && req.url === '/about'){

        res.write('<html>');
        res.write('<body>');
        res.write('<h1>About Page</h1>');
        res.write('<p>My name is Amreet</p>');
        res.write('<a href="/">Back to Home</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();

    }

    if(req.method === 'GET' && req.url === '/redirect'){

        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();

    }

    res.statusCode = 404;
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>404 Page Not Found</h1>');
    res.write('<a href="/">Go Home</a>');
    res.write('</body>');
    res.write('</html>');
    res.end();

});

server.listen(3000);