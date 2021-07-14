const express = require('express');
const mp = require('../lib/mypage')
const authChecker = require('../middleware/authChecker')

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));
router.use('/', authChecker);

//내가 작성한 게시글 불러오기
router.get('/board', (req, res) => { 
    mp.get_my_post(req, res);
});

router.get('/reply', (req, res) => { 
    mp.get_my_reply(req, res);
});

module.exports = router;