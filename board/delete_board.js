//모든 공지 삭제

//공지 하나를 삭제
const deleteOneBoard = (req,res,date,title) => {
  const database = req.app.get('database');

    database.BoardModel.deleteOneBoard(title,date, function (err, results) {
      if (err) {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>일지 삭제 중 오류 발생</h2>');
        console.log( err.stack );
        res.end();
      }//if err
    
      console.log('공지 삭제 결과', results);

      res.redirect('/boardlist');
    });//end deleteOneBoard
}

const functions = {
  deleteOneBoard : deleteOneBoard
};
module.exports = functions;
