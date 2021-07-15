const db = require('../db/db_controller');
const so = require('./str_operation');

exports.write_post = function (req, res, category) {
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
    req.body.aid = req.result.ID;

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

exports.get_category_post = function (res, category, offset) {
    db.SELECT('*', 'board_' + category, 'LIMIT 50 OFFSET ' + offset).then((data) => { //then : resolve 호출된 경우
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })  
}

exports.get_reply = function (res, category, bid) {
    db.SELECT('*', 'reply_' + category, 'WHERE bid=' + bid).then((data) => { //then : resolve 호출된 경우
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res. json({msg: 'ERROR'}); //error 응답
    })  
}

