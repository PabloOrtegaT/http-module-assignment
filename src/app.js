const http = require('http');
const number = require('./routes/number.js') 

const myRouter = (path) => {
  const routes = {
    myNumber: number.myNumber,
    reset: number.reset
}
  if (routes[path]){
    return routes[path];
  }
  return number.notFound;
}

const server = http.createServer((req, res) => {
  const [, domain] = req.url.split('/');

  res.setHeader('Content-Type', 'application/json');
  const route = myRouter(domain);
  return route(req, res);
})

// settings
server.listen(5000, ()=> {
  console.log('server on port 5000')
});
