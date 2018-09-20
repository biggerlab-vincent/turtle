var express = require('express');
var router = express.Router();
var TurtleUser = require('../modules/TurtleUser.js');
var TurtleCode = require('../modules/TurtleCode.js');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});
/* GET login page. */
router.get('/login', function(req, res, next) {
  if (req.session.user){
    //console.log(req.session.user);
    res.redirect('/');
  }else{
    res.render('login', { title: 'login' });
  }
});


router.post('/login',function(req, res){
  //var userEntity = new TurtleUser(req.body);
  var postData = {
    username: req.body.username,
    password: req.body.password
  }
  req.session.user = postData;
  //console.log(postData)
  TurtleUser.findOne({
    username: postData.username,
    password:postData.password
  },function(err,data){
    if(err) throw err;
    if(data){
      //res.send('登录成功');
      //console.log(data);
      console.log("login successed");
      res.status(200).send('OK');
    }else{
      res.status(200).send('failed');
      //res.send('账号或密码错误');
    }
  })
})
router.post('/signup', function(req, res){
    //var userEntity = new TurtleUser(req.body);
    //console.log(req.body)
    var postData = {
      username: req.body.username,
      password : req.body.password,
      email : req.body.email,
      phone : req.body.phone,
      age : req.body.age,
      bio : req.body.bio,
    }
    req.session.user = postData;
    TurtleUser.findOne({username: postData.username},function(err,data){
      if(data){
        console.log({'err':'username used'})
        res.status(200).send('failed');
        //res.end();
      }else{
        TurtleUser.create(postData,function(err, data){
          if(err) {console.log(err)};
          //console.log(1)
          res.status(200).send('OK');
          //console.log("signup successed");
          //editorModalAlert("Signup Successfully!");
          console.log(2)
          //res.redirect('/home');
        })
      }
    })
    
})
router.post('/logout', function(req, res){
  res.clearCookie('user');
  res.clearCookie('pass');
  req.session.destroy(function(err) {
    if(err){
      console.log(err);
    }else{
      console.log("logout successed!");
      res.status(200).send("ok");
      //window.location.href = '/login';
    }
    // cannot access session here
  })
})

/* GET mycode page. */
router.get('/account', function(req, res, next) {
  if (req.session.user){
    console.log(req.session.user);
    res.render('account', { title: 'Account' , user: req.session.user});
  }else{
    res.redirect('/login');
  } 
});
router.post('/account', function(req, res, callback) {
  //console.log(req.body,req.session)
  TurtleUser.findOne({username: req.session.user.username},function(err,data){
    if(data){
      //res.redirect('/login');
      //console.log(1);
      //console.log(data);
      req.session.user = data;
      res.json(data);
    }else{
      //console.log(0);
      console.log(err);
    }
  })
});

router.post('/update', function(req, res){
  //var userEntity = new TurtleUser(req.body);
  var postData = {
    username: req.body.username,
    password : req.body.password,
    email : req.body.email,
    phone : req.body.phone,
    age : req.body.age,
    bio : req.body.bio,
  }
  var id = req.session.user._id;
  req.session.user = postData;
  var options ={
    new: true,
  }
  /*
  var id = req.session.user._id;
  module.findByIdAndUpdate(id, postData, callback) ---sussuss   
  module.findByIdAndUpdate(req.session.user._id, postData, callback) ---failed
  */
  TurtleUser.findByIdAndUpdate(id, postData, options, function(err,data){
        if(err) {
          throw err;
        }else{
          //console.log(data);
          console.log("update successed");
          res.status(200).send("ok");
        }
  });
})
/* GET / page. */
router.get('/', function(req, res, next) {
  if (req.session.user){
    console.log(req.session.user);
    res.render('index', { title: 'Home', user: req.session.user });
  }else{
    res.redirect('/login');
  }
  
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  if (req.session.user){
    console.log(req.session.user);
    res.render('index', { title: 'Home', user: req.session.user });
  }else{
    res.redirect('/login');
  }
  
});

//save save as 
router.post('/save', function(req, res){
  var id = req.body.id;
  var postData = {
    _id: id,
    username: req.session.user.username,
    code:req.body.code,
    time: req.body.time
  }
  //console.log(postData);
  TurtleCode.findByIdAndUpdate(id, postData ,function(err,data){
    if (err) {
      console.log(err)      
    }else{
      console.log("saved success");
      res.status(200).send("ok")
    }
  })
})
router.post('/saveas', function(req, res){
  console.log(req.body);
  var postData = {
    "username": req.session.user.username,
    "title": req.body.title,
    "code": req.body.code,
    "time": req.body.time
  }
  console.log(postData);
  TurtleCode.create(postData,function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log("save as successed");
      res.status(200).send("ok");
    }
  })
})
//delete code 
router.post('/deleteCode', function(req, res){
  var id = req.body.id;
  console.log(id);
  TurtleCode.findByIdAndRemove(id, function(err, data){
    if(err){
      console.log(err);
    }else{
      //console.log(data);
      console.log("delete successed");
      res.status(200).send("ok")
    }
  })
})
/* GET mycode page. */
router.get('/mycode', function(req, res, next) {
  if (req.session.user){
    res.render('mycode', { title: 'mycode', user: req.session.user });
  }else{
    res.redirect('/login');
  }
  
});
router.post('/mycode', function(req, res) {
  console.log(req.session.user.username)
  var username = req.session.user.username;
  TurtleCode.find({username: username},function(err,data){
    if(data){
      res.json(data);
      req.session.code = data;
    }else{
      //console.log(0);
      console.log(err);
    }
  })
});

router.post('/codeEdit', function(req, res) {
  console.log(req.body.id);
  //console.log(req.session)
  var id = req.body.id;
  //var id = mongoose.Types.ObjectId.isValid(id);
  
  TurtleCode.findById( id, function(err,data){
    if(err){
      console.log(0);
      console.log(err);
      //req.session.code = data;
    }else{
      //res.end();
      console.log(data)
      res.send(data);
      //req.session.code 
    }
  });
  
  
});

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}
module.exports = router;
