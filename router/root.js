const express = require('express');
const db = require('../db/db_controller');
const so = require('../lib/str_operation');
const authChecker = require('../middleware/authChecker')

var router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended : false}));
router.use('/customer1', authChecker);

//GET 예시 - SELECT -> path parameter
router.get('/customer', (req, res) => { //get method
    conditions = 'WHERE cid=' + req.result.ID;
    db.SELECT('*', 'customer', conditions).then((data) => { //then : resolve 호출된 경우
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.send('error'); //error 응답
    })  
});

//GET 예시 - SELECT -> path parameter
router.get('/customer1', (req, res) => { //get method
    conditions = 'WHERE cid=' + req.result.ID;
    db.SELECT('*', 'customer_info', conditions).then((data) => { //then : resolve 호출된 경우
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.send('error'); //error 응답
    })  
});

//POST 예시 - INSERT -> request body
//요청할 때 body의 각 key value 순서는 db 테이블 순서와 같아야함
router.post('', (req, res) => { //post method - body 정보를 전달
    var keys = so.query_attr_format(req.body, TABLE);
    var values = so.query_attr_format(req.body, VALUES);
    db.INSERT(keys, values, 'customer');
})

//PUT 예시 - UPDATE -> request body
router.put('', (req, res) => {
    var key_values = so.query_attr_format(req.body, SET);
    conditions = 'WHERE id="test2"';
    db.UPDATE(key_values, 'customer', conditions);
})

//DELETE 예시 - DELETE -> path parameter
router.delete('', (req, res) => {
    conditions = 'WHERE id="test2"';
    db.DELETE('customer', conditions);  
})

module.exports = router;