const db = require('../db/db_controller');

exports.get_my_post = function (req, res) {
    var attribute = ' as table_name, bid, title, contents, clicks, date, cid '
    var union_query = 'WHERE cid=' + req.result.ID + ' ';
    board_list = ['business', 'driver', 'immigration', 'land', 'national', 'permission', 'school', 'worker']
    
    for(var i=0; i<board_list.length; i++) {
        union_query += 'UNION ALL SELECT "' + board_list[i] + '"' + attribute + 'FROM board_' +  board_list[i] + ' WHERE cid=' + req.result.ID + ' ';
    }
    union_query += 'ORDER BY date';

    db.SELECT('"administration"' + attribute, 'board_administration', union_query).then((data) => { //then : resolve 호출된 경우
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })  
}

exports.get_my_reply = function (req, res) {
    var attribute = ' as table_name, rid, contents, date, bid, aid '
    var union_query = 'WHERE aid=' + req.result.ID + ' ';
    reply_list = ['business', 'driver', 'immigration', 'land', 'national', 'permission', 'school', 'worker']
    
    for(var i=0; i<reply_list.length; i++) {
        union_query += 'UNION ALL SELECT "' + reply_list[i] + '"' + attribute + 'FROM reply_' +  reply_list[i] + ' WHERE aid=' + req.result.ID + ' ';
    }
    union_query += 'ORDER BY date';

    db.SELECT('"administration"' + attribute, 'reply_administration', union_query).then((data) => { //then : resolve 호출된 경우
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })  
}
