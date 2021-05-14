const fs = require('fs');
const { getMyNumber, postMyNumber, putMyNumber, getMyNumberMultiplied } = require('../controllers/number');


const home = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.promises.readFile('./src/public/index.html', { encoding: "utf-8" })
    .then(function(result){
        response.write(result);
        response.end();
    })
    .catch(function(err) {
        console.log("Error while trying to recover index.html" + err);
   });;
};

const notFound = (request, response) => {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    fs.promises.readFile('./src/public/404.html', { encoding: "utf-8" })
    .then(function(result){
        response.write(result);
        response.end();
    })
    .catch(function(err) {
        console.log("Error while trying to recover 404.html" + err);
    });
};

const reset = (request, response) => {
  if(request.method === 'DELETE'){
      const myNumberJSON = fs.readFileSync('./src/public/data.txt', { encoding: "utf-8" });
      const myNumber = JSON.parse(myNumberJSON).myNumber;

      if(myNumber !== null && request.url === '/reset'){
          fs.writeFileSync('./src/public/data.txt', JSON.stringify({
              myNumber : null
          }));

          response.statusCode = 200;
          return response.end(JSON.stringify({ message: 'Number deleted' }));
      }
      return notFound(request, response);
  }

  response.statusCode = 400;
  return response.end(JSON.stringify({ message: 'You can only use DELETE method in this path' }))
}

const myNumber = (request, response) => {
  switch(request.method) {
      case 'GET':
          const regex = /^\d+$/;
          const uriParams = request.url.split('/')[2];

          if(request.url === '/myNumber') return getMyNumber(request, response);
          if(regex.test(uriParams)) getMyNumberMultiplied(request, response, uriParams);

          else notFound(request, response);   
      break;

      case 'PUT':
          if(request.url === '/myNumber') putMyNumber(request, response);
          else notFound(request, response);
      break;

      case 'POST':
          if(request.url === '/myNumber') postMyNumber(request, response);
          else notFound(request, response);
      break;

      default: 
          break;
  }
}

module.exports = {
  home,
  notFound,
  myNumber,
  reset,
};