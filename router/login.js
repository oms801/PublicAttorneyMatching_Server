const express = require('express');
const lg = require('../lib/login');
var fs = require('fs')

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

router.post('/customer', (req, res) => { 
    console.log("asdf");
    lg.login(req, res,'customer');
});

router.post('/attorney', (req, res) => {
    lg.login(req, res, 'attorney');
});

module.exports = router;