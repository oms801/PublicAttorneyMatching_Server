const express = require('express');
const mc = require('../lib/matching');

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

//행정사 리스트 + 필터링
router.post('/attorney/list', (req, res) => { 
});

//선택한 행정사 세부 정보
router.post('/attorney/:aid', (req, res) => {
    //req.params.aid 
});

module.exports = router;