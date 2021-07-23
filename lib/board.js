const db = require('../db/db_controller');
const so = require('./str_operation');
const date_oper = require('./date_operation');

exports.write_post = function (req, res, category) {
    if(req.token == 'INVALID') {
        res.json({msg: "INVALID"})
        return ;
    }
    req.body.cid = req.result.ID;

    var keys = so.query_attr_format(req.body, TABLE);
    var values = so.query_attr_format(req.body, VALUES);

    db.INSERT(keys, values, 'board_' + category).then((data) => {
        res.json({msg: "SUCCESS"});
    })
    .catch((error) => {
        res.json({msg: "ERROR"});
    })
}

exports.write_reply = function (req, res, category) {
    if(req.token == 'INVALID') {
        res.json({msg: "INVALID"})
        return ;
    }
    req.body.aid = req.result.ID; //aid에 jwt verify ID값 

    var keys = so.query_attr_format(req.body, TABLE);
    var values = so.query_attr_format(req.body, VALUES);

    db.INSERT(keys, values, 'reply_' + category).then((data) => {
        db.UPDATE('reply_num = reply_num + 1', 'board_' + category, 'WHERE bid=' + req.body.bid).then((data) => {
            res.json({msg: "SUCCESS"});
        })
        .catch((error) => {
            res.json({msg: "ERROR"});
        })
    })
    .catch((error) => {
        res.json({msg: "ERROR"});
    })
}

exports.get_category_post = function (res, category, offset, order) {
    var count, board, result;
    db.SELECT('COUNT(*) AS cnt', 'board_' + category, '').then((data) => { //then : resolve 호출된 경우
        //select 결과 json 형태로 응답
        count = JSON.parse(JSON.stringify(data[0]));
        attr = 'bid, title, contents, clicks, reply_num, date_format(board_' + category + '.date, "%Y-%m-%d %H:%i:%S") AS date';
        db.SELECT(attr, 'board_' + category, ' ORDER BY ' + order + ' desc LIMIT 10 OFFSET ' + offset).then((data) => { //then : resolve 호출된 경우
            board = JSON.parse(JSON.stringify(data));
            board = date_oper.set_time_board(board);
            result = {count : count, board: board}
            console.log(result);
            res.json(result); //select 결과 json 형태로 응답
        })
        .catch((error) => { //catch : reject 호출된 경우
            res.json({msg: "ERROR"}); //error 응답
        })
    })  
}

exports.get_post_and_reply = function (res, category, bid) {
    var board, reply, result;
    var board_table = 'board_' + category;
    var reply_table = 'reply_' + category;
    var attr = 'name, profile_image_src, ' + reply_table + '.contents, ' + reply_table + '.date';
    var tables = board_table +', ' + reply_table + ', ' + 'attorney_info';
    var conditions = 'WHERE ' + board_table + '.bid=' + reply_table + '.bid AND ' + reply_table + '.aid=attorney_info.aid AND ' + board_table + '.bid=' + bid + ' ORDER BY ' + reply_table + '.date desc';

    db.UPDATE('clicks = clicks + 1', 'board_' + category, 'WHERE bid=' + bid).then((data => { //조회수 + 1  
        db.SELECT('clicks, reply_num', board_table, 'WHERE bid=' + bid).then((data) => { //then : resolve 호출된 경우
            board = JSON.parse(JSON.stringify(data))[0];
            db.SELECT(attr, tables, conditions).then((data) => { //then : resolve 호출된 경우
                reply = JSON.parse(JSON.stringify(data));
                reply = date_oper.set_time_reply(reply);
                result = {board: board, reply: reply};
                console.log(result);
                res.json(result); //select 결과 json 형태로 응답
            })
            .catch((error) => { //catch : reject 호출된 경우
                res.json({msg: "ERROR"}); //error 응답
            })
        })
        .catch((error) => { //catch : reject 호출된 경우
            res.json({msg: "ERROR"}); //error 응답
        })
    })) 
}
