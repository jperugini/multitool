const express = require('express');
const router = express.Router();
// declare axios for making http requests
const axios = require('axios');
const https = require('https');

const REDMINE_API = 'https://redmine.production.local';

// At instance level
const axios_instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/issues/:key', (req, res) => {
    if (req.params.key) {
    axios_instance.get(`${REDMINE_API}/issues.json?assigned_to_id=me`, { headers: { 'X-Redmine-API-Key': req.params.key } })
        .then(data => {
            res.status(200).json(data.data.issues);
        })
        .catch(error => {
            res.status(500).send(error);
        });
    } else {
        res.status(500).send('No api key');
    }
});

module.exports = router;