const db = require('../db/db_controller');
const so = require('./str_operation');

exports.write_case = function (req, res) {
    if(req.token == 'INVALID') {
        res.json({msg: "INVALID"})
        return ;
    }
    req.body.aid = req.result.ID;

    var keys = so.query_attr_format(req.body, TABLE);
    var values = so.query_attr_format(req.body, VALUES);

    db.INSERT(keys, values, 'case_board').then((data) => {
        res.json({msg: "SUCCESS"});
    })
    .catch((error) => {
        res.json({msg: "ERROR"});
    })
}

exports.get_cases = function (res, category, offset, order) {
    var count, cases, result;
    var where_statement = 'WHERE case_board.aid=attorney_info.aid AND category="' + category + '"';
    var order_statement = 'ORDER BY ' + order + ' desc ';
    var limit_statement = 'LIMIT 10 OFFSET ' + offset;
    
    db.SELECT('COUNT(*) AS cnt', 'case_board', 'WHERE category="' + category + '" ').then((data) => { //then : resolve 호출된 경우
        //select 결과 json 형태로 응답
        count = JSON.parse(JSON.stringify(data[0]));
        db.SELECT('cid, title, image_src, name', 'case_board, attorney_info', where_statement + order_statement + limit_statement).then((data) => { //then : resolve 호출된 경우
            cases = JSON.parse(JSON.stringify(data));
            result = {count : count, cases: cases}
            console.log(result);
            res.json(result); //select 결과 json 형태로 응답
        })
        .catch((error) => { //catch : reject 호출된 경우
            res.json({msg: "ERROR"}); //error 응답
        })
    })  
}

exports.get_case_contents = function (cid, res) {
    db.SELECT('contents', 'case_board', 'WHERE cid=' + cid).then((data) => { //then : resolve 호출된 경우
        res.json(data[0]); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })
}