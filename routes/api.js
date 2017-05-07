const express = require('express');
const request = require('request');
const router = express.Router();
const app = express();

router.post('/token', (req, res) => {

    client_id = 'CLIENT_ID';
    client_secret = 'CLIENT_SECRET';
   
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: req.body,
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
        res.send(body);
    });

});

module.exports = router;