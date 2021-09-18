const fs= require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if( url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">Send</button></form></body>');
        res.write('<html>');
        return res.end();
    }
    if( url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });
      return req.on('end',() =>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('meessage.txt', message, err =>{
            res.statusCode = 302;
            res.setHeader('Localtion', '/');
            return res.end()
            });
        });
    }
    
    res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>First Page</title></head>');
        res.write('<body><h1>HI this is a message</h1></body>');
        res.write('<html>');
        res.end();
}; 

module.exports = requestHandler;

/*module.exports ={
    handler: requestHandler,    
    }; 
*/

//module.exports.handler = requestHandler; 
//exports.handler = requestHandler;
