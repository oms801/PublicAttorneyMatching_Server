const multer = require('multer');

var storage = multer.diskStorage({
  destination: 'image/',
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '_' + Math.floor(Math.random() * 100000) + '.jpg') //파일명 지정 콜백함수
  }
});

exports.upload = multer({ storage: storage });