const moment = require('moment');
moment.locale('ko');
const createOneBoard = (req,res) => {
  const database = req.app.get('database');
  
  let curTime = moment().format('LLLL');
  //해당 제목과 날짜가 있으면 거부(같은 시간(분까지만) 체크)
  database.BoardModel.findOneBoard(req.body.title, curTime, function (err, results) {
    if (err) {
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>공지 조회 중 오류 발생</h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();
    }//if err
    
    if (results.length > 0) {
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

      console.log('해당 공지 찾음.');
      res.write('<h2>해당 공지가 이미 있습니다.</h2>');
      res.end('<a href=/boardlist>돌아가기</a>');
    }//if results
    else {
      //모델 인스턴스 객체 만들어 저장
      curTime = moment().format('LLLL');
      let boardModel = new database.BoardModel({ 'title': req.body.title,'contents': req.body.contents, 'created_at': curTime, 'updated_at' :  curTime });
      boardModel.save(function (err) {
        if (err) { console.log(err);
          res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

          console.log('공지 저장중 에러발생.');
          res.write('<h2>해당 공지 저장 중 오류가 발생했습니다.</h2>');
          res.write('제목이 비어있는지 확인해주세요.');
          res.end('<a href=/boardlist>돌아가기</a>');
        }else{
          console.log('사용자 데이터 추가함.');
          res.redirect('/boardlist');
        }
      });
    }})//end findOneBoard;
};

const functions = {
  createOneBoard : createOneBoard
};

module.exports = functions;
  