const express = require('express');
const bd = require('../lib/board');
const authChecker = require('../middleware/authChecker')

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

//게시글 작성 - 유저
router.post('/post/:category', authChecker, (req, res) => { 
    bd.write_post(req, res, req.params.category);
});

//답변 작성 - 행정사
router.post('/reply/:category', authChecker, (req, res) => { 
    bd.write_reply(req, res, req.params.category);
});


//카테고리 게시글 10개, 총 게시글 수 불러오기  - 유저, 행정사
router.get('/post/all/:category/:offset/:order', (req, res) => { 
    bd.get_category_post(res, req.params.category, req.params.offset, req.params.order);   
});

//클릭한 게시글 및 답변 불러오기 - 유저, 행정사
router.get('/post/:category/:bid', (req, res) => { 
    bd.get_post_and_reply(res, req.params.category, req.params.bid);   
});

module.exports = router;