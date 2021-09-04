const passport = require('passport');
const moment = require('moment');
moment.locale('ko');
//====== Type : GET ======//

//홈 화면 - index.ejs
const home = function (req, res) {
  console.log('/ 패스 요청됨.');
  res.render('index.ejs');
};

const dashboard = function(req,res){
  console.log('/dashboard 패스 요청됨.');
  const database = req.app.get('database');
  database.UserModel.findOne({'email': req.user.email}, function(err,user){
    //1. 데이터베이스 오류 
    if (err) {
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>대시보드 조회 중 오류 발생</h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();
    }//if err

    //2. 등록된 사용자가 없는 경우
    if(!user){
      console.log('계정이 일치하지 않음');
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>대시보드 조회 중 오류 발생</h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();
    }
    console.dir(user);
    database.DiaryModel.findAllDiary(user._id, function (err, results) {
      console.dir(results.length);
      if (Array.isArray(req.user)) {
        res.render('./user/dashboard', { user: req.user[0]._doc, diarynum : results.length });
      }
      else {
        res.render('./user/dashboard', { user: req.user, diarynum : results.length });
      }
    });
  });
 
}

//프로필 화면 - 로그인 여부를 확인할 수 있게 먼저 isLoggedIn 미들웨어 실행
const profile = function (req, res) {
  console.log('/profile 패스 요청됨.');

  //인증된 경우 req.user 객체에 사용자 정보가 있으며, 인증이 안 된 경우 req.user는 false 값임
  console.log('req.user 객체의 값');
  console.dir(req.user);

  //인증이 안 된 경우
  if (!req.user) {
    console.log('사용자 인증이 안 된 상태임.');
    res.redirect('/');
  }
  //인증된 경우
  console.log('사용자 인증된 상태임.');
  if (Array.isArray(req.user)) {
    res.render('./user/profile', { user: req.user[0]._doc });
  }
  else {
    res.render('./user/profile', { user: req.user });
  }

};

const getProfileUpdate = function(req,res){
  if (Array.isArray(req.user)) {
    res.render('./user/profileUpdate', { user: req.user[0]._doc });
  }
  else {
    res.render('./user/profileUpdate', { user: req.user });
  }
}


//로그인 폼 화면
const getLogin = function (req, res) {
  console.log('/login 패스 요청됨.');
  res.render('./user/login.ejs', { message: req.flash('loginMessage') });
};

//회원가입 폼 링크
const getSignup = function (req, res) {
  console.log('/signup 패스 요청됨.');
  res.render('./user/signup.ejs', { message: req.flash('signupMessage') });
};

//페이스북 인증 라우팅
const authFacebook = passport.authenticate('facebook',{
  scope : 'email'
});

//페이스북 인증 콜백 라우팅
const authFacebookCallback = passport.authenticate('facebook',{
  successRedirect : '/profile',
  failureRedirect : '/'
});

//구글 인증 라우팅
const authGoogle = passport.authenticate('google',{
  scope : 'email'
});

//구글 인증 콜백 라우팅
const authGoogleCallback = passport.authenticate('google',{
  successRedirect : '/profile',
  failureRedirect : '/'
});

//로그아웃
const logout = function (req, res) {
  console.log('/logout 패스 요청됨.');
  req.logout();
  res.redirect('/');
};

//====== Type : POST ======//

//로그인 폼 화면
const postLogin = passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
});

//회원가입 폼 링크
const postSignup = passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
});

const postProfileUpdate = function(req,res){
  console.log('/profile/update 패스 요청됨');
  console.log(req.user.email,req.body.name);
  const database = req.app.get('database');
  database.UserModel.updateUser(req.user.email,req.body.name,moment().format('YYYY MMMM Do, h:mm:ss a'),function(err,user){
    if (err) {
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>일지 조회 중 오류 발생</h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();
    }//if err

    console.dir(user);
    //2. 등록된 사용자가 없는 경우
    if(!user){
      console.log('계정이 일치하지 않음');
      res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
      res.write('<h2>일지 조회 중 오류 발생</h2>');
      res.write('<p>' + err.stack + '</p>');
      res.end();
    }
  }); 
  
  res.redirect('/profile');
}

module.exports = {
  home : home,
  profile : profile,
  getProfileUpdate : getProfileUpdate,
  getLogin : getLogin,
  getSignup : getSignup,
  logout : logout,
  dashboard : dashboard,
  postLogin : postLogin,
  postSignup : postSignup,
  postProfileUpdate :postProfileUpdate,
  authFacebook : authFacebook,
  authFacebookCallback : authFacebookCallback,
  authGoogle : authGoogle,
  authGoogleCallback : authGoogleCallback
};