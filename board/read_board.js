//모든 공지 가져오기
const readAllBoard = (req,res) => {
  const database = req.app.get('database');
    database.BoardModel.findAllBoard(function (err, results) {
      if (err) {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>공지 조회 중 오류 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
      }//if err
     
      if (results.length > 0) {
        console.log('공지를 찾음.');

        let context = {user : req.user, boards : results};
        
        res.render('./board/boardlist',context,function(err,html){
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
        console.log('공지를 찾지 못함.');
        let context = {user : req.user, boards : []};
        req.app.render('./board/boardlist',context,function(err,html){
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
};

//하나만 가져오기
const readOneBoard= (req,res,date,title) => {
  const database = req.app.get('database');
    database.BoardModel.findOneBoard(title, date, function (err, results) {
      if (err) {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>공지 조회 중 오류 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
      }//if err
      
      if (results.length > 0) {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

        console.log('해당 공지 찾음.');
        
        let context = { user : req.user, board : results[0]._doc}
        req.app.render('./board/board',context,function(err,html){
          if(err){
            console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

            res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
            res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();
          }

          res.end(html);
        });//end render
      }//if results
      else {
        console.log('일치하는 공지를 찾지 못함.');
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>일치하는 공지 없음</h2>');
        res.end();
      }//else results
    });//end findOneDiary
};

const functions = {
  readAllBoard : readAllBoard,
  readOneBoard : readOneBoard
}

module.exports = functions;