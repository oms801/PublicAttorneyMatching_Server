const db = require('../db/db_controller');
const so = require('../lib/str_operation');
const en = require('../lib/encrypt');
const date_oper = require('../lib/date_operation');


exports.get_my_post = function (req, res) {
    var attr = ' as table_name, bid, title, contents, clicks, cid, date_format(board_';
    var union_query = so.get_union_query(req, 'board', attr);
    db.SELECT('"administration"' + attr + 'administration.date, "%Y-%m-%d %H:%i:%S") AS date', 'board_administration', union_query).then((data) => {
        var board = JSON.parse(JSON.stringify(data));
        board = date_oper.set_time_board(board);
        res.json(board); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })  
}

exports.get_my_reply = function (req, res) {
    var attr = ' as table_name, rid, contents, bid, aid, date_format(reply_';
    var union_query = so.get_union_query(req, 'reply', attr);
    db.SELECT('"administration"' + attr + 'administration.date, "%Y-%m-%d %H:%i:%S") AS date', 'reply_administration', union_query).then((data) => { 
        var reply = JSON.parse(JSON.stringify(data));
        reply = date_oper.set_time_reply(reply);
        res.json(reply); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })    
}

exports.get_post_info = function (res, category, bid) {
    db.SELECT('*', 'board_' + category, 'WHERE bid=' + bid).then((data) => {
        var board = JSON.parse(JSON.stringify(data));
        board = date_oper.set_time_board(board);
        res.json(board[0]); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })  
}

exports.user_check = function(req, res) {
    db.SELECT('password', req.body.auth + '_login', 'WHERE id=' + '"' + req.body.id + '"').then((data) => {
        if(en.comp(req.body.password, data[0].password)) { //비밀번호가 맞다면
            res.json({msg: "SUCCESS"});
        }
        else { //틀리면
            res.json({msg: "WRONG_PASSWORD"})
        }
    })
}

exports.update_info = function(req, res) {
    var table = req.body.auth;
    if(req.token == 'INVALID') {
        res.json({msg: 'INVALID_TOKEN'});
    }
    var where_query = 'WHERE ';
    if(req.body.auth == 'customer') {
        where_query += 'cid=' + req.result.ID;
    }
    else {
        where_query += 'aid=' + req.result.ID;
    }
    if(req.body.password) {
        req.body.password = en.enc(req.body.password); //비밀번호 암호화 
        db.UPDATE('password="' + req.body.password + '"', table + '_login', where_query);
        delete req.body.password;
    }
    delete req.body.auth;
    if(Object.keys(req.body).length > 0) {
        var set = so.query_attr_format(req.body, SET);
        db.UPDATE(set, table + '_info', where_query);
    }
    res.json({msg: 'SUCCESS'});
}