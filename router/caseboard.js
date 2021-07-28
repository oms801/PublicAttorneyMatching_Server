const express = require('express');
const cb = require('../lib/caseboard')
const authChecker = require('../middleware/authChecker')

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

//사례글 작성 - 행정사
router.post('', authChecker, (req, res) => { 
    cb.write_case(req, res);
});

//사례글 10개 가져오기?
router.get('/all/:category/:offset/:order', (req, res) => {
    cb.get_cases(res, req.params.category, req.params.offset, req.params.order);
});

//클릭한 사례글 contents 가져오기
router.get('/contents/:cid', (req, res) => {
    cb.get_case_contents(req.params.cid, res);
});

module.exports = router;