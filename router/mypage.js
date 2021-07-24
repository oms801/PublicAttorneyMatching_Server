const express = require('express');
const mp = require('../lib/mypage')
const authChecker = require('../middleware/authChecker')
const mul = require('../lib/multer')

var router = express.Router();

var upload = mul.upload;

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

//내정보 관리 접근 시
router.post('/info/access', (req, res) => {
    mp.user_check(req, res);
})

//내 정보 수정
router.put('/info/update', authChecker, (req, res) => {
    mp.update_info(req, res);
})

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

//행정사 메인 - 소갯말 수정
router.put('/attorney/intro' ,authChecker, (req, res) => {
    mp.update_attorney_intro(req, res);  
})

router.post('/attorney/image/update/:src', authChecker, upload.single('image'), (req, res) => {
    mp.update_profile_image_src(req, res, req.params.src);
})

module.exports = router;