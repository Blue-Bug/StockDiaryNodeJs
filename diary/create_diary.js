const moment = require('moment');
moment.locale('ko');
const createOneDiary = (req,res,email) => {
  const database = req.app.get('database');
  database.UserModel.findOne({ 'email': email }, function (err, user) {
    //오류 발생 시
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

    else {
      //입력한 이름을 저장할 Array (배열)
      let diaries=[];
      if(Array.isArray(req.body.item)){
        for(let i = 0; i < req.body.item.length; i++){
          let diary = 
          { //종목명
            "item" : req.body.item[i]
            //증권사
            , "bank": req.body.bank[i]
            //매매 구분
            , "trade_category": req.body.trade_category[i]
            //매수 일자
            , "buy_date": req.body.buy_date[i]
            //매도 일자
            , "sell_date": req.body.sell_date[i]
            //보유 기간
            , holding_period: req.body.holding_period[i]
            //손익
            , profit_loss: req.body.profit_loss[i]
            //수익률
            , profit_rate: req.body.profit_rate[i]
            //체결 단가
            , transaction_price: req.body.transaction_price[i]
            //체결 수량
            , transaction_volume: req.body.transaction_volume[i]
            //매매 비용
            , trading_cost: req.body.trading_cost[i]
            //총 체결 금액
            , total_price: req.body.total_price[i]
            //매매 이유
            , trading_reason: req.body.trading_reason[i]
          };
          diaries.push(diary);
        }
      }
      else{
        let diary = 
        { //종목명
          "item" : req.body.item
          //증권사
          , "bank": req.body.bank
          //매매 구분
          , "trade_category": req.body.trade_category
          //매수 일자
          , "buy_date": req.body.buy_date
          //매도 일자
          , "sell_date": req.body.sell_date
          //보유 기간
          , holding_period: req.body.holding_period
          //손익
          , profit_loss: req.body.profit_loss
          //수익률
          , profit_rate: req.body.profit_rate
          //체결 단가
          , transaction_price: req.body.transaction_price
          //체결 수량
          , transaction_volume: req.body.transaction_volume
          //매매 비용
          , trading_cost: req.body.trading_cost
          //총 체결 금액
          , total_price: req.body.total_price
          //매매 이유
          , trading_reason: req.body.trading_reason
        };
        diaries.push(diary);
      }
      //모델 인스턴스 객체 만들어 저장
      let curTime = moment().format('LLLL');
      let diaryModel = new database.DiaryModel({ 'user_id': user._id, 'diary': diaries, 'created_at': curTime, 'updated_at' :  curTime });
      diaryModel.save(function (err) {
        if (err) { throw err; }
        console.log('사용자 데이터 추가함.');
        res.redirect('/diarylist');
      });
    }//end if
  });//end findOne
};

const functions = {
  createOneDiary : createOneDiary
};

module.exports = functions;
  