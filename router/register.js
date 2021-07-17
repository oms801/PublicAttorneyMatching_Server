const express = require('express');
const rg = require('../lib/register');
const mul = require('../lib/multer')

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

var upload = mul.upload;

//아이디 중복 체크 요청 처리 부분

//유저
router.post('/customer/overlap', (req, res) => { 
    rg.register_check(req, res,'customer');
});

//행정사 
router.post('/attorney/overlap', (req, res) => { 
    rg.register_check(req, res,'attorney');
});


//회원가입 요청 처리 부분
//클라이언트 단에서 아이디 중복체크 확인 된 사람만 회원가입 요청

//유저 
router.post('/customer', (req, res) => {
    rg.insert_register_infos(req, res, 'customer');
});

//행정사
router.post('/attorney', upload.array('file'), (req, res) => { 
    console.log(req.files);
    console.log(req.files[0].filename);
    req.body.profile_image_src = req.files[0].filename;
    rg.insert_register_infos(req, res, 'attorney');
});

module.exports = router;