const express = require('express');
const lg = require('../lib/login');

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

router.post('/customer', (req, res) => { 
    lg.login(req, res,'customer');
});

router.post('/attorney', (req, res) => {
    lg.login(req, res, 'attorney');
});

module.exports = router;