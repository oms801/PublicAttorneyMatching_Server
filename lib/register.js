const db = require('../db/db_controller');
const so = require('./str_operation');
const en = require('./encrypt');

exports.register_check = function(req, res, table) {
    db.USER_CHECK(req.body.id, table).then((data) => { //then : resolve 호출된 경우
        if(data[0].user_exist == 1) { //이미 존재하는 id라면
            res.send("ID_EXIST");
        }  
        else { //존재하지 않는다면 
            res.send("SUCCESS");
        }
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.send('ERROR'); //error 응답
    })  
}

exports.insert_register_infos = function(req, res, table) {
    req.body.password = en.enc(req.body.password); //비밀번호 암호화
    var keys = so.query_attr_format(req.body, TABLE);
    var values = so.query_attr_format(req.body, VALUES);
    db.INSERT(keys, values, table); //db에 회원가입 정보저장
    res.send("SUCCESS");
}