const express = require('express')
const app = express()
const limiter = require('./lib/limiter').limiter;

//라우터
const root = require('./router/root')
const register = require('./router/register')
const login = require('./router/login')
const board = require('./router/board')
const mypage = require('./router/mypage')
const matching = require('./router/matching')

//라우터 base 경로 설정
app.use('/', limiter);
app.use('/get', root)
app.use('/register', register)
app.use('/login', login)
app.use('/board', board)
app.use('/mypage', mypage)
app.use('/matching', matching)

app.use(express.static('public'));
app.use(express.static('image'));

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})