//모든 일지 가져오기
const readAllDiary = (req,res,email) => {
  const database = req.app.get('database');

  database.UserModel.findOne({'email': email}, function(err,user){
    //1. 데이터베이스 오류 
    if (err) {
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>일지 조회 중 오류 발생</h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();
    }//if err

    //2. 등록된 사용자가 없는 경우
    if(!user){
      console.log('계정이 일치하지 않음');
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>일지 조회 중 오류 발생</h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();
    }
    
    database.DiaryModel.findAllDiary(user._id, function (err, results) {
      if (err) {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>일지 조회 중 오류 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
      }//if err
    
      console.log('이메일 [%s]로 일지 검색 결과', email);
     
      if (results.length > 0) {
        console.log('이메일과 일치하는 일지 찾음.');

        let context = {user : req.user, diary : results};
        
        res.render('./diary/diarylist',context,function(err,html){
          if(err){
            console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

            res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
            res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();
          }

          res.end(html);
        });//end render       
      }
      else {
        console.log('이메일과 일치하는 일지를 찾지 못함.');
        let context = {user : req.user, diary : []};
        req.app.render('./diary/diarylist',context,function(err,html){
          if(err){
            console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

            res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
            res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();
          }

          res.end(html);
        });//end render
      }
    });
  });
};

//하나만 가져오기(일지니깐 해당 날짜로)
const readOneDiary = (req,res,date,email) => {
  const database = req.app.get('database');
  database.UserModel.findOne({'email': email}, function(err,user){
    //1. 데이터베이스 오류 
    if (err) {
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>일지 조회 중 오류 발생</h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();
    }//if err

    //2. 등록된 사용자가 없는 경우
    if(!user){
      console.log('계정이 일치하지 않음');
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>일지 조회 중 오류 발생</h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();
    }
    
   
    database.DiaryModel.findOneDiary(user._id, date, function (err, results) {
      if (err) {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>일지 조회 중 오류 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
      }//if err
    
      console.log('이메일 [%s]로 일지 검색 결과', email);
      
      if (results.length > 0) {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

        console.log('이메일과 일치하는 일지 찾음.');
        
        if(date){
          console.dir(results);
          let context = {user : req.user, diary : results[0]._doc.diary};
          
          req.app.render('./diary/diary',context,function(err,html){
            if(err){
              console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

              res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
              res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
              res.write('<p>' + err.stack + '</p>');
              res.end();
            }

            res.end(html);
          });//end render
        }//if date
        else{
          //넘어온 날짜가 없다면          
          console.log('해당 날짜와 일치하는 일지를 찾지 못함.');
          res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
          res.write('<h2>해당 날짜와 일치하는 일지 없음</h2>');
          res.end();
        }//else date
      }//if results
      else {
        console.log('이메일과 일치하는 일지를 찾지 못함.');
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>이메일과 일치하는 일지 없음</h2>');
        res.end();
      }//else results
    });//end findOneDiary
  });
};

const functions = {
  readAllDiary : readAllDiary,
  readOneDiary : readOneDiary,
}

module.exports = functions;