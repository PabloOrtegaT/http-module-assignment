const fs = require('fs');
const { getMyNumber, postMyNumber, putMyNumber, getMyNumberMultiplied } = require('../controllers/number');


const home = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFileSync('./public/index.html', { encoding: "utf-8" })
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
    fs.readFileSync('./public/404.html', { encoding: "utf-8" })
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
      const numberJSON = fs.readFileSync('./public/data.txt', { encoding: "utf-8" });
      const myNumber = JSON.parse(numberJSON).myNumber;

      if(myNumber !== null && request.url === '/reset'){
          fs.writeFileSync('./public/data.txt', JSON.stringify({
              myNumber : null
          }));

          response.statusCode = 200;
          return response.end(JSON.stringify({ message: 'Successfully deleted' }));
      }
      return notFound(request, response);
  }

  response.statusCode = 400;
  return response.end(JSON.stringify({ message: 'You can only use DELETE method in this path' }))
}

const myNumber = (request, response) => {
  switch(request.method) {
      case 'GET':
          const isNumberRegex = /^\d+$/;
          const uriParam = request.url.split('/')[2];

          if(request.url === '/myNumber') return getMyNumber(request, response);
          if(isNumberRegex.test(uriParam)) getMyNumberMultiplied(request, response, uriParam);
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