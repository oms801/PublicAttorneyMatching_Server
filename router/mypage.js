const express = require('express');
const mp = require('../lib/mypage')
const authChecker = require('../middleware/authChecker')

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

//유저 정보 수정

//행정사 정보 수정

//유저가 작성한 게시글 불러오기
router.get('/customer/board', authChecker, (req, res) => { 
    mp.get_my_post(req, res);
});

//행정사가 작성한 댓글 불러오기
router.get('/attorney/reply', authChecker, (req, res) => { 
    mp.get_my_reply(req, res);
});

//행정사가 클릭한 답변의 게시글 정보 불러오기
router.get('/attorney/post/:category/:bid', (req, res) => {
    mp.get_post_info(res, req.params.category, req.params.bid);
})

module.exports = router;