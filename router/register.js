const express = require('express');
const db = require('../db/db_controller');
const so = require('../lib/str_operation');
const en = require('../lib/encrypt');
const rg = require('../lib/register');

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));

//아이디 중복 체크 요청 처리 부분

//유저
router.post('/user/overlap', (req, res) => { 
    rg.register_check(req, res,'user');
});

//행정사 
router.post('/attorney/overlap', (req, res) => { 
    rg.register_check(req, res,'attorney');
});


//회원가입 요청 처리 부분
//클라이언트 단에서 아이디 중복체크 확인 된 사람만 회원가입 요청

//유저 
router.post('/user', (req, res) => {
    rg.insert_register_infos(req, res, 'user');
});

//행정사
router.post('/attorney', (req, res) => { 
    rg.insert_register_infos(req, res, 'attorney');
});

module.exports = router;