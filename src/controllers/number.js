const fs = require('fs');

const getMyNumber = (req, res) => {
    const numberJSON = fs.readFileSync('./src/public/data.txt', { encoding: "utf-8" });
    const myNumber = JSON.parse(numberJSON).myNumber;

    if(myNumber !== null){
        res.statusCode = 200;
        return res.end(numberJSON);
    } else {
        res.statusCode = 404;
        return res.end(JSON.stringify({
            message: 'There is no number in the database'
        }));
    }
}

const getMyNumberMultiplied = (req, res, uriParam) => {
    const numberJSON = fs.readFileSync('./src/public/data.txt', { encoding: "utf-8" });
    const myNumber = JSON.parse(numberJSON).myNumber;

    if(myNumber !== null){
        res.statusCode = 200;
        return res.end(JSON.stringify({
            multipliedNumber: myNumber * uriParam
        }));
    } else {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: 'No current value stored on the DB, cannot perform the operation'}));
    }
}

const postMyNumber = (req, res) => {
    const numberJSON = fs.readFileSync('./src/public/data.txt', { encoding: "utf-8" });
    const myNumber = JSON.parse(numberJSON).myNumber;

    if(myNumber === null){
        const body = [];

        req.on('data', (chunk) => body.push(chunk));

        req.on('end', () => {
          const buffer = Buffer.concat(body).toString();
          const bodyValue = JSON.parse(buffer).myNumber;

            if(typeof bodyValue !== 'number'){
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'Input can only be a number' }));
            }

          fs.writeFileSync('./src/public/data.txt', buffer, { encoding: 'utf-8'} );
          res.statusCode = 201;
          return res.end(JSON.stringify({
              message: 'Number successfully created'
          }));
        });
    } else {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: 'Number already exists, use PUT Method' }));
    }
}


const putMyNumber = (req, res) => {
    const numberJSON = fs.readFileSync('./src/public/data.txt', { encoding: "utf-8" });
    const myNumber = JSON.parse(numberJSON).myNumber;

    if(myNumber !== null){
        const body = [];

        req.on('data', (chunk) => body.push(chunk));

        req.on('end', () => {
          const buffer = Buffer.concat(body).toString();
          const bodyValue = JSON.parse(buffer).myNumber;

            if(typeof bodyValue !== 'number'){
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'Input can only be a number' }));
            }

          fs.writeFileSync('./src/public/data.txt', buffer, { encoding: 'utf-8'} );
          res.statusCode = 200;
          return res.end(JSON.stringify({
              message: 'Number updated'
          }));
        });
    } else {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'No value stored on the DB. Use POST Method' }));
    }
}

module.exports = {
    getMyNumber,
    getMyNumberMultiplied,
    postMyNumber,
    putMyNumber
}