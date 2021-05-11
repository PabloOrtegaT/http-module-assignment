const http = require('http');
const number = require('./routes/number.js') 

const myRouter = (path) => {
  const routes = {
    '/': number.home,
    '/myNumber': number.myNumber,
    '/reset': number.reset,
  };
  if (routes[path]){
    return routes[path];
  }
  return number.notFound;
}

const server = http.createServer((req, res) => {
  const routeUsed = req.url.split('?')[0];
  const route = myRouter(routeUsed);
  return route(req, res);
})

// settings
server.listen(5000, ()=> {
  console.log('server on port 5000')
});
