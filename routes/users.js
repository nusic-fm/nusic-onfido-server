exports = module.exports = function(app, mongoose) {

  const multer = require('multer');
  const cloudinary = require('cloudinary');
  const validator = require('validator');
  const { ObjectID } = require("mongodb");

  var storage = multer.diskStorage({
      filename: function (req, file, callback) {
          callback(null, Date.now() + file.originalname);
      }
  });
  var imageFilter = function (req, file, cb) {
      // accept image files only
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
          req.imgError = true;
      }
      cb(null, true);
  };
  var upload = multer({ storage: storage, fileFilter: imageFilter });
  cloudinary.config({
      cloud_name: app.get('cloud_name'),
      api_key: app.get('api_key'),
      api_secret: app.get('api_secret')
  });

  var express = require('express');
  var router = express.Router();
  const { SHA256 } = require('crypto-js');

  /* GET users listing. */
  router.get('/', function(req, res, next) {
    console.log("in users get");
    res.send('respond with a resource');
  });
  router.post('/', function(req, res, next) {
    console.log("in users post");
    res.send('respond with a resource');
  });

  router.post('/signup', upload.single("image"), async function(req, res, next) {

    try {
      const body = req.body;
      let User = app.db.models.User;
      
      let data = req.body.data;
      data = JSON.parse(data);
      data.email = data.email.toLowerCase();

      const userStd = await User.findOne({ email: { $regex : new RegExp(`^${data.email}$`, "i")} })

      if (userStd) {
          return res.send({ success: false, err: 'Email already Registered', message: 'Email already Registered' })
      }

      let url = await uploadImage(req, res);
      data.imageUrl = url;
      data.password = SHA256(data.password).toString();

      data.emailVerificationToken = app.jwt.createJWTTokenWithObject({
        email:data.email
      });

      const newUser = new app.db.models.User(data)

      var newlyAddedUser = await newUser.save()

      console.log("New Added User",newlyAddedUser);
      newlyAddedUser = JSON.parse(JSON.stringify(newlyAddedUser));
      delete newlyAddedUser.password;
      delete newlyAddedUser.emailVerificationToken;
      res.json({success: true, data: newlyAddedUser});
      
    } catch (err) {
      res.send({
          success: false,
          err: err.message,
          message: "Something went wrong, please try again later"
      });
    }
  });


  async function uploadImage(req, res) {
    console.log("test 1 ", req.file);
    try {
      const response = await cloudinary.v2.uploader.upload(req.file.path, {
          secure: true,
          public_id: "myride-"+Date.now() +"-"+ req.file.originalname
      });
      console.log("response = ",response.secure_url);
      return response.secure_url;
    }
    catch(error) {
      console.log(err);
      console.log("Image Error");
      // change it to unable to process your image, please try again
      return res.send({ success: false, message: err.message });
    }
  }

  router.post('/login', async function(req, res, next) {
    try {
      const body = req.body;
      console.log("form body ==>",body);
      let User = app.db.models.User;
      body.email = body.email.toLowerCase();

      let userData = await User.findOne({email: body.email, password: body.password})
      if(!userData){
        return res.send({success: false,err: "Please Provide A Valid Email or Password"})
      }
      console.log(body.email);
      const userObj = JSON.parse(JSON.stringify(userData));
      delete userObj.password;
      return res.send({ success: true, data:  userObj});
    }
    catch(error){
      console.log(err);
      return res.send({ success: false, err: err.message, message: err.message });
    }
  });

  app.use('/users', router);

}

