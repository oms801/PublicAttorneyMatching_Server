var dform = function(num) {
    if(num < 10) {
        return '0' + String(num);
    }
    else return String(num);
}

var syearform = function (num) {
    return (String(num)).substring(2, 4);
}

var dsform = function(now, date) {
    var date_string = '';
    if(now.getFullYear() - date.getFullYear() > 0) {
        date_string += syearform(date.getFullYear()) + '/';
    }
    date_string += dform(date.getMonth()) + '/' + dform(date.getDate()) + ' ' + dform(date.getHours()) + ':' + dform(date.getMinutes());
    return date_string;
}

exports.set_time_board = function(board) { 
    var now = new Date();
    var date;

    for(var i=0; i<board.length; i++) {
        date = new Date(board[i].date);

        board[i].date = dsform(now, date);

        var second = (now.getTime() - date.getTime()) / 1000;

        if(second < 60) {
            board[i].from_now = String(Math.floor(second)) + '초전';
        }
        else if((second/60) < 60) {
            board[i].from_now = String(Math.floor(second/60)) + '분전';
        }
        else if((second/60/60) < 24) {
            board[i].from_now = String(Math.floor(second/60/60)) + '시간전';
        }
        else if((second/60/60/24) < 7) {
            board[i].from_now = String(Math.floor(second/60/60/24)) + '일전';
        }
        else if((second/60/60/24) < 30) {
            board[i].from_now = String(Math.floor(second/60/60/24/7)) + '주전';
        }
        else if((second/60/60/24/30) < 12) {
            board[i].from_now = String(Math.floor(second/60/60/24/30)) + '달전';
        }
        else {
            board[i].from_now = String(Math.floor(second/60/60/24/30/12)) + '년전';
        }
    }
    return board;
}

exports.set_time_reply = function(reply) {
    var now = new Date();
    var date;

    for(var i=0; i<reply.length; i++) {
        date = new Date(reply[i].date);
        reply[i].date = dsform(now, date);
    }
    return reply;
}