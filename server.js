const express = require('express');
const { readFile } = require('fs');

const app = express();
const port = 8080;

app.use(express.static(__dirname + '/public'));

// Configure '/cities' endpoint to send city data to the client
app.get('/cities', (req, res) => {
  readFile(`${__dirname}/data.json`, 'utf-8',
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      }
      else {
        res.status(200).send(data);
      }
    });
});

app.listen(port, () => console.log(`Server listening at port:${port}`));