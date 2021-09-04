//모든 일지 삭제
const deleteAllDiary = (req,res,email) => {
  //email _id를 참조한다.
  const database = req.app.get('database');
  database.DiaryModel.deleteAllDiary(email, function (err, results) {
    if (err) {
      callback(err, null);
      return;
    }
  
    console.log('이메일 [%s]로 일지 삭제 결과', email);
    console.dir(results);
  
    if (results.deletedCount > 0) {
      console.log('삭제한 일지 개수 : ',results.deletedCount);
      return true;
    }
    else {
      console.log('삭제할 일지가 없음');
      return false;
    }
  });
}
//일지 하나를 삭제
const deleteOneDiary = (req,res,date,email) => {
  const database = req.app.get('database');
  database.UserModel.findOne({ 'email': email }, function (err, user) {
    //오류 발생 시
    //1. 데이터베이스 오류 
    if (err) {
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>일지 삭제 중 오류 발생</h2>');
      console.log( err.stack );
      res.end();
    }//if err

    //2. 등록된 사용자가 없는 경우
    if(!user){
      console.log('계정이 일치하지 않음');
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>일지 삭제 중 오류 발생</h2>');
      console.log( err.stack );
      res.end();
    }

    database.DiaryModel.deleteOneDiary(user._id, date, function (err, results) {
      if (err) {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>일지 삭제 중 오류 발생</h2>');
        console.log( err.stack );
        res.end();
      }//if err
    
      console.log('이메일 [%s]로 일지 삭제 결과', email);
      console.dir(results);

      res.redirect('/diarylist');
    });//end deleteOneDiary
  });//end findOne
}

const functions = {
  deleteAllDiary : deleteAllDiary,
  deleteOneDiary : deleteOneDiary
}

module.exports = functions;
