const express = require('express');
const db = require('../db/db_controller');
const so = require('../lib/str_operation');
const en = require('../lib/encrypt');
const lg = require('../lib/login');

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

router.post('/user', (req, res) => { 
    lg.login(req, res,'user');
});

router.post('/attorney', (req, res) => {
    lg.login(req, res, 'attorney');
});

module.exports = router;