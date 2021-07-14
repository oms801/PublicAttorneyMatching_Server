const db = require('../db/db_controller');
const so = require('../lib/str_operation');

exports.get_my_post = function (req, res) {
    var attr = ' as table_name, bid, title, contents, clicks, date, cid ';
    var union_query = so.get_union_query(req, 'board', attr);
    db.SELECT('"administration"' + attr, 'board_administration', union_query).then((data) => { 
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })  
}

exports.get_my_reply = function (req, res) {
    var attr = ' as table_name, rid, contents, date, bid, aid ';
    var union_query = so.get_union_query(req, 'reply', attr);
    db.SELECT('"administration"' + attr, 'reply_administration', union_query).then((data) => { 
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })    
}
