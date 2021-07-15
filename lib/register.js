const db = require('../db/db_controller');
const so = require('./str_operation');
const en = require('./encrypt');

exports.register_check = function (req, res, table) {
    db.USER_CHECK(req.body.id, table + '_login').then((data) => { //then : resolve 호출된 경우
        if (data[0].user_exist == 1) { //이미 존재하는 id라면
            res.json({ msg: 'ID_EXIST' });
        }
        else { //존재하지 않는다면 
            res.json({ msg: 'SUCCESS' });
        }
    })
        .catch((error) => { //catch : reject 호출된 경우
            res.json({ msg: 'ERROR' }); //error 응답
        })
}

exports.insert_register_infos = function (req, res, table) {
    req.body.password = en.enc(req.body.password); //비밀번호 암호화 

    login_info = { id: req.body.id, password: req.body.password };

    var keys = so.query_attr_format(login_info, TABLE);
    var values = so.query_attr_format(login_info, VALUES);

    db.INSERT(keys, values, table + '_login').then((data) => { //_login 테이블에 로그인에 필요한 정보 저장
        db.SELECT(table[0] + 'id', table + '_login', 'WHERE id=' + '"' + req.body.id + '"').then((data) => {
            delete req.body.id;
            delete req.body.password;
            if(table == 'customer') {
                req.body.cid = data[0].cid;
            }
            else {
                req.body.aid = data[0].aid;
            }
            keys = so.query_attr_format(req.body, TABLE);
            values = so.query_attr_format(req.body, VALUES);
            db.INSERT(keys, values, table + '_info') //_info 테이블에 개인 정보 저장
        })
    })
}