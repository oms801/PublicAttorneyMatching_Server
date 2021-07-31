const express = require('express');
const lo = require('../lib/logout');
const authChecker = require('../middleware/authChecker');

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

router.get('', authChecker, (req, res) => {
    lo.logout(req, res)
})

module.exports = router;