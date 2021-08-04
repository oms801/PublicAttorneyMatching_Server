const con = require('./db_config').init();

console.log(con);

var query_statement;

//conditions는 WHERE 절 그대로 입력 받음
//conditions가 없으면 ''입력 받음

exports.SELECT = function (attributes, table, conditions) {
    return new Promise((resolve, reject) => {
        query_statement = 'SELECT ' + attributes + ' FROM ' + table + ' ' + conditions;
        console.log(query_statement)
        con.query(query_statement, function (err, rows, fields) {
            console.log(rows);
            resolve(rows);
        });
    })
}

exports.INSERT = function (keys, values, table) {
    return new Promise((resolve, reject) => {
        query_statement = 'INSERT INTO ' + table + '(' + keys + ')' + ' VALUES(' + values + ')';
        console.log(query_statement)
        con.query(query_statement, function (err, rows, fields) {
            console.log(rows);
            resolve(rows);
        })
    })
}

exports.UPDATE = function (key_values, table, conditions) {
    return new Promise((resolve, reject) => {
        query_statement = 'UPDATE ' + table + ' SET ' + key_values + ' ' + conditions;
        console.log(query_statement)
        con.query(query_statement, function (err, rows, fields) {
            console.log(rows);
            resolve(rows);
        });
    })
}

exports.DELETE = function (table, conditions) {
    query_statement = 'DELETE FROM ' + table + ' ' + conditions
    console.log(query_statement)
    con.query(query_statement, function (err, rows, fields) {
        console.log(rows);
    });
}

exports.USER_CHECK = function (id, table) {
    return new Promise((resolve, reject) => {
        query_statement = 'SELECT EXISTS (SELECT id FROM ' + table + ' WHERE id=' + '"' + id + '") ' + 'as user_exist'
        console.log(query_statement)
        con.query(query_statement, function (err, rows, fields) {
            console.log(rows);
            resolve(rows);
        });
    })
}


