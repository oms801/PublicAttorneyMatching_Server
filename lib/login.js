const db = require('../db/db_controller');
const so = require('./str_operation');
const en = require('./encrypt');
const jwt = require('./jwt_token')

//로그인 요청 시 db 암호화된 password와 입력 password 비교 - en.comp()
//세션이나 ,jwt 발급 필요할듯
//response body 형태 {msg : msg, token: token}
//msg에 따라 클라이언트에서 처리 - success면 로그인, jwt 저장, 아니면 msg에 따라 처리

exports.login = function(req, res, table) {
    db.USER_CHECK(req.body.id, table).then((data) => { //then : resolve 호출된 경우
        if(data[0].user_exist == 1) { //아이디가 있다면 비밀번호 비교
            conditions = 'WHERE id="' + req.body.id + '"'
            db.SELECT('*', table, conditions).then((data => { 
                if(en.comp(req.body.password, data[0].password)) { //비밀번호가 맞다면
                    //jwt token 발급 resposne body로 전송
                    if(table == 'customer') { //user가 로그인시
                        token = jwt.get_token(data[0].UID, 'customer'); //UID로 토큰 발급
                    }
                    else { //행정사가 로그인 시
                        token = jwt.get_token(data[0].AID, 'attorney'); //AID로 토큰 발급
                    }
                    res.json({msg: "SUCCESS", token: token}); 
                }
                else { //비밀번호가 틀렸다면
                    res.json({msg: "WRONG_PASSWORD", token: "NONE"});
                }
            }))
        }  
        else { //아이디가 존재하지 않는다면 
            res.json({msg: "ID_NONE", token: "NONE"});
        }
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: 'ERROR', token: "NONE"}); //error 응답
    })  
}