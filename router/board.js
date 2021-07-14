const express = require('express');
const bd = require('../lib/board');
const authChecker = require('../middleware/authChecker')

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));
router.use('/', authChecker);

//게시글 작성 - 유저
router.post('/post/:category', (req, res) => { 
    bd.write_post(req, res, req.params.category);
});

//답변 작성 - 행정사
router.post('/reply/:category', (req, res) => { 
    bd.write_reply(req, res, req.params.category);
});


//카테고리 전체 게시글 불러오기 - 유저, 행정사
router.get('/post/:category/:offset', (req, res) => { 
    bd.get_category_post(res, req.params.category, req.params.offset);   
});

//게시글에 대한 답변 불러오기
router.get('/reply/:category/:bid', (req, res) => { 
    bd.get_reply(res, req.params.category, req.params.bid);
});

module.exports = router;