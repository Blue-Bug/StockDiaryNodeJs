const createDiary = require('../diary/create_diary');
const readDiary = require('../diary/read_diary');
const deleteDiary = require('../diary/delete_diary');
const updateDiary = require('../diary/update_diary');

const diaryRead = function (req, res) {
  console.log('/diary 패스 요청됨.');
  
  readDiary.readOneDiary(req,res,req.query.created_at,req.user.email);
};

const diaryList = function (req, res) {
  console.log('/diarylist 패스 요청됨.');
  
  readDiary.readAllDiary(req,res,req.user.email);
};

const diaryForm = function(req,res){  
  console.log('/diary/create 패스 요청됨.');
  res.render('./diary/diaryForm',{ user: req.user });
}

const diaryCreate = function(req,res){
  console.log('/diary/create 패스 요청됨');

  createDiary.createOneDiary(req,res,req.user.email);
}
const diaryDelete = function(req,res){
  console.log('/diary/delete 패스 요청됨');
  deleteDiary.deleteOneDiary(req,res,req.body.created_at,req.user.email);
}
module.exports = {
  diaryRead : diaryRead,
  diaryList : diaryList,
  diaryForm : diaryForm,
  diaryCreate : diaryCreate,
  diaryDelete : diaryDelete
};