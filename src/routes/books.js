const fs = require('fs');
const os = require('os');

const home = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.promises.readFile('./public/index.html', { encoding: "utf-8" })
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
    fs.promises.readFile('./public/404.html', { encoding: "utf-8" })
    .then(function(result){
        response.write(result);
        response.end();
    })
    .catch(function(err) {
        console.log("Error while trying to recover 404.html" + err);
    });
};

const books = (request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    fs.promises.readFile('./public/books.txt', { encoding: "utf-8" })
    .then(function(result){
        response.write(result);
        response.end();
    })
    .catch(function(err) {
        console.log("Error while trying to recover 404.html" + err);
    });
  } else if (request.method === 'POST') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    let body = '';
    request.on('error', (err) => {
      console.log(err);
    }).on('data', (part) => {
      body += part;
    }).on('end', () => {
      fs.writeFileSync('./public/books.txt', body, { flag: 'a' });
      response.write('Book added!');
      response.end();
    });
  } else if (request.method === 'DELETE') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    fs.truncate('./public/books.txt', 0, () => console.log('books deleted'));
    response.write('Books deleted!');
    response.end();
  }
};

const fileViewer = (request, response) => {
  const myUrl = new URL(`${request.headers.host}${request.url}`);
  const fileRequested = myUrl.searchParams.get('name');
  console.log(fileRequested)
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    fs.promises.readFile(`./${fileRequested}`, { encoding: "utf-8" })
    .then(function(result){
        response.write(result);
        response.end();
    })
    .catch(function(err) {
        console.log(`Error while trying to recover the file requested: ${fileRequested} .`+ err);
        notFound(request, response)
    });
};

const serverStatus = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  const statusJSON = {
    hostname: os.hostname(),
    cpus: os.cpus(),
    arch: os.arch(),
    uptime: os.uptime(),
    userInfo: os.userInfo(),
    freemem: os.freemem(),
  };
  response.write(JSON.stringify(statusJSON));
  response.end();
};

module.exports = {
  home,
  notFound,
  books,
  fileViewer,
  serverStatus,
};