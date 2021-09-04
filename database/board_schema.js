const crypto = require('crypto');
const moment = require('moment');
const Schema = {};
moment.locale('ko');
//Schema의 속성으로 추가
Schema.createSchema = function (mongoose) {
  //스키마 정의
  let BoardSchema = mongoose.Schema({
    //unique 속성을 사용하면 자동으로 index 생성
    //diary 필드는 배열임
    title : {type : String, required: true }
    , contents: {type: String}
    , created_at: { type: String, index: { unique: true }, 'default': moment().format('LLLL') }
    , updated_at: { type: String, index: { unique: false }, 'default': moment().format('LLLL') }
  });

  //모델 인스턴스에서 사용할 수 메소드 추가

  //필수 속성에 대한 유효성 확인
  BoardSchema.path('title').validate(function (title) {
    return title.length;
  }, 'title 칼럼 값이 없습니다.');
  
  //스키마에 static 메소드 추가, 모델 객체에서 사용가능(모델 인스턴스에서 사용하려면 method()로 정의)
  //email로 조회, 전부 조회
  BoardSchema.static('findAllBoard', function (callback) {
    return this.find({}, callback);
  });
  BoardSchema.static('findOneBoard', function (title,created_at, callback) {
    return this.find({ title:title, created_at: created_at }, callback);
  });
  BoardSchema.static('deleteAllBoard', function (id, callback) {
    return this.deleteMany({user_id: id }, callback);
  });
  BoardSchema.static('deleteOneBoard', function (title,created_at, callback) {
    return this.deleteOne({ title:title, created_at: created_at}, callback);
  });
  console.log('BoardSchema 정의함.');
  return BoardSchema;
};

//module.exports에 Schema 객체 할당
module.exports = Schema;

