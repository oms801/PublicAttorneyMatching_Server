const jwt = require('../lib/jwt_token')

//rest api 요청시 jwt 검증하는 미들웨어
//jwt는 클라이언트에서 Authorization 헤더에 "Bearer 토큰값" 형태로 전달 

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1]; 
        jwt.verify(token).then((data) => { //then : resolve 호출된 경우
            req.result = data; //select 결과 json 형태로 응답
            req.token = 'VALID';
            next();
        })
        .catch((error) => { //catch : reject 호출된 경우
            req.token = 'INVALID';
            res.json({msg: "INVALID"});
        })
    } else {
        req.token = 'INVALID';
    }
}




