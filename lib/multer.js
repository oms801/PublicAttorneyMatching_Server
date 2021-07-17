const multer = require('multer');

var storage = multer.diskStorage({
  destination: 'image/',
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '_' + Math.floor(Math.random() * 100000) + '.jpg') //파일명 지정 콜백함수
  }
});

exports.upload = multer({ storage: storage });

exports.user = function (req, res) {
  const image = req.file.path;
  console.log(req.file);

  if (image == undefined) {
    //예외처리
    return res.status(400).json({ code: 400, msg: "이미지 전송 실패" });
  }

  //db에 req.file.path와 req.body.name등을 저장
  console.log(req.body.name);
}