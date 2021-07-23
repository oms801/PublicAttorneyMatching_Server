const express = require('express');
const mp = require('../lib/mypage')
const authChecker = require('../middleware/authChecker')

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));
router.use('/', authChecker);

//유저 정보 수정

//행정사 정보 수정

//유저가 작성한 게시글 불러오기
router.get('/customer/board', (req, res) => { 
    mp.get_my_post(req, res);
});

//행정사가 작성한 댓글 불러오기
router.get('/attorney/reply', (req, res) => { 
    mp.get_my_reply(req, res);
});

module.exports = router;