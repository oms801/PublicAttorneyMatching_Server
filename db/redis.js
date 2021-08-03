const de = require('dotenv');
const redis = require('redis');

de.config();

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

client.on('error', function(err) {
    console.log('Error' + err);
})

//jwt : c_cid or a_aid

//키값 저장
exports.REDIS_SET = function(key, value) { //token 발급과 저장 사이 시간 공백 여유 1초
    client.set(key, value);
    client.expire(key, 1799); //TTL - 29분 59초 - 1799초
}

//유효키 검증
exports.REDIS_GET = function(key) {
    return new Promise((resolve, reject) => {
        client.get(key, function(err, value) {
            if(err) reject(err);
            if(value) { //JWT가 살아있다면
                resolve('VALID');
            }
            else { //삭제되었다면
                resolve('INVALID');
            }   
        })
    })
}

//로그아웃 시 키값 삭제하기 - 접근 불가
exports.REDIS_DEL = function(key) {
    client.del(key);
}
