const express = require('express')
const app = express()

//라우터
const root = require('./router/root')
const register = require('./router/register')
const login = require('./router/login')
const board = require('./router/board')
const mypage = require('./router/mypage')

//라우터 base 경로 설정
app.use('/get', root)
app.use('/register', register)
app.use('/login', login)
app.use('/board', board)
app.use('/mypage', mypage)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})