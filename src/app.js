// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const express = require('express');
// const mongoose = require('mongoose');
const http = require('http');
const books = require('./routes/books.js') 

const myRouter = (path) => {
  const routes = {
    '/': books.home,
    '/books': books.books,
    '/file-viewer': books.fileViewer,
    '/server-status': books.serverStatus,
  };
  if (routes[path]){
    return routes[path];
  }
  return books.notFound;
}

const server = http.createServer((req, res) => {
  const routeUsed = req.url.split('?')[0];
  const route = myRouter(routeUsed);
  return route(req, res);
})

// settings
server.listen(3000, ()=> {
  console.log('server on port 3000')
});
