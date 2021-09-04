const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config');
const moment = require('moment');
moment.locale('ko');
module.exports = function(app){
  return new FacebookStrategy({
    clientID : config.facebook.clientID,
    clientSecret : config.facebook.clientSecret,
    session: true,
    callbackURL : config.facebook.callbackURL
  }, function(accessToken,refreshToken,profile,done){
    console.log('passport의 facebook 호출됨.');

    let options = {'facebook.id':profile.id};
    const database = app.get('database');
    database.UserModel.findOne(options,function(err,user){
      if(err) return done(err);

      if(!user){
        let user = new database.UserModel({
          name : profile.displayName,
          email :profile.emails[0].value,
          provider : 'facebook',
          authToken : accessToken,
          facebook : profile._json
        });

        user.save(function(err){
          if(err) console.log(err);
          return done(err,user);
        });
      }
      else{
        database.UserModel.updateOne({email : user.email},{ recent_activity:moment().format('YYYY MMMM Do, h:mm:ss a')},function(err,results){
          console.log(results);
        });
        return done(err,user);
      }
    });
  });
};