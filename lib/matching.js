const db = require('../db/db_controller');
const so = require('../lib/str_operation');

//검증된 사람만 보여줄지도 결정
exports.get_attorney_list = function (req, res, category, land) {
    var land_query = so.get_matching_land_query(land);
    db.SELECT('*', 'attorney_info', 'WHERE ' + category + '=1 AND ' + land_query).then((data) => { 
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })  
}

exports.get_attorney_detail = function (req, res, aid) {
    db.SELECT('"administration"' + attr, 'reply_administration', union_query).then((data) => { 
        res.json(data); //select 결과 json 형태로 응답
    })
    .catch((error) => { //catch : reject 호출된 경우
        res.json({msg: "ERROR"}); //error 응답
    })    
}
