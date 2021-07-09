//전역변수
global.SET = 0;
global.TABLE = 1;
global.VALUES = 2;

var attr_format = function(param) {
    var new_param;
    if(typeof(param) == "string") {
        new_param = '"' + param + '"';
    }
    else if(typeof(param) == "number") {
        new_param = param.toString();
    }
    else if(typeof(param) == "boolean") {
        new_param = param.toString();
    }
    return new_param;
}

//query_attr_format(param_ary)
//쿼리문에 사용되는 속성 중 string 형은 ""로 감싸주고, int, boolean은 string형으로 변경, 
//속성을 콤마로 구분하여 문자열로 반환하는 함수
//쿼리에 사용될 속성값들을 array 형태로 받음
//넘겨줄 때 json 형태의 body를 그대로 넘김

exports.query_attr_format = function(json_param, mode) { 
    var attribute_statement = '';
    var new_param
    var length = Object.keys(json_param).length;
    var count = 0;

    if(mode != SET && mode !=TABLE && mode != VALUES) {
        return "ERROR";
    }

    for(key in json_param) {
        if(mode == TABLE) {
            new_param = key; //속성 이름
        }
        else {
            new_param = attr_format(json_param[key]);
        }

        if(mode == SET) {
            attribute_statement += key + "=";
        }
        attribute_statement += new_param;
        if(count + 1 < length) { //다음 원소가 있다면
            attribute_statement += ", ";
        }
        count++;
    }
    return attribute_statement;
}

