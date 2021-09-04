const createBoard = require('../board/create_board');
const readBoard = require('../board/read_board');
const deleteBoard = require('../board/delete_board');
const updateBoard = require('../board/update_board');

const boardRead = function (req, res) {
  console.log('/board 패스 요청됨.');
  
  readBoard.readOneBoard(req,res,req.query.created_at,req.query.title);
};

const boardList = function (req, res) {
  console.log('/boardlist 패스 요청됨.');
  
  readBoard.readAllBoard(req,res);
};

const boardForm = function(req,res){  
  console.log('/board/create 패스 요청됨.');
  res.render('./board/boardForm',{ user: req.user });
}

const boardCreate = function(req,res){
  console.log('/diary/create 패스 요청됨');

  createBoard.createOneBoard(req,res);
}
const boardDelete = function(req,res){
  console.log('/diary/delete 패스 요청됨');
  deleteBoard.deleteOneBoard(req,res,req.body.created_at,req.body.title);
}
module.exports = {
  boardRead : boardRead,
  boardList : boardList,
  boardForm : boardForm,
  boardCreate : boardCreate,
  boardDelete : boardDelete
};