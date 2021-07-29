const express = require('express');
const mc = require('../lib/matching');

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

//행정사 리스트 + 필터링
router.get('/attorney/list/:category/:land', (req, res) => { 
    mc.get_attorney_list(req, res, req.params.category, req.params.land);
});

module.exports = router;