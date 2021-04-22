const fs = require('fs');
const os = require('os');

const home = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
//   const html = fs.readFileSync('./src/public/index.html', 'utf-8');
//   response.write(html);
  response.end();
};
const notFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
//   const html = fs.readFileSync('./src/public/404.html', 'utf-8');
//   response.write(html);
  response.end();
};

const books = (request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    // const content = `${fs.readFileSync('./src/books.txt')}`;
    // response.write(content);
    response.end();
  } else if (request.method === 'POST') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    let body = '';
    request.on('error', (err) => {
      console.log(err);
    }).on('data', (part) => {
      body += part;
    }).on('end', () => {
    //   fs.writeFileSync('./src/books.txt', body, { flag: 'a' });
      response.write('Book added!');
      response.end();
    });
  } else if (request.method === 'DELETE') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    // fs.truncate('./src/books.txt', 0, () => console.log('books deleted'));
    response.write('Books deleted!');
    response.end();
  }
};

const fileViewer = (request, response) => {
  const myUrl = new URL(`${request.headers.host}${request.url}`);
  const fileRequested = myUrl.searchParams.get('name');
  try {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    // const fileContent = fs.readFileSync(`./${fileRequested}`, 'utf-8');
    // response.write('File content');
    // response.write(fileContent);
  } catch (err) {
    console.log(err);
    notFound(request, response);
  }
  response.end();
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