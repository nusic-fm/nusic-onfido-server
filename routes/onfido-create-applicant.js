exports = module.exports = function(app, mongoose) {

    var express = require('express');
    var router = express.Router();
    const { Onfido, Region } = require("@onfido/api");
    const ONFIDO_API_TOKEN = app.get('ONFIDO_API_TOKEN')

    const onfido = new Onfido({
        apiToken: ONFIDO_API_TOKEN,
        // Supports Region.EU, Region.US and Region.CA
        region: Region.EU
    });
    
  
    /* GET users listing. */
    router.get('/', function(req, res, next) {
      console.log("in users get");
      res.send('respond with a resource');
    });
    router.post('/', function(req, res, next) {
      console.log("in users post");
      res.send('respond with a resource');
    });
  
    router.post('/create', async function(req, res, next) {
  
      try {
        const body = req.body;
        console.log("body = ", body);

        const applicant = await onfido.applicant.create({
            firstName: body.firstName,
            lastName: body.lastName
        });
        console.log("Applicant success = ", applicant);

        res.json({success: true, data: applicant});
        
      } catch (err) {
        res.send({
            success: false,
            err: err.message,
            message: "Something went wrong, please try again later"
        });
      }
    });

    router.get('/getapplicant', async function(req, res, next) {
  
        try {
          const body = req.body;
  
          const applicant = await onfido.applicant.find(body.applicantId)

          console.log("getapplicant Applicant success = ", applicant);
          
          res.json({success: true, data: applicant});
          
        } catch (err) {
          res.send({
              success: false,
              err: err.message,
              message: "Something went wrong, please try again later"
          });
        }
      });

      router.post('/create-check', async function(req, res, next) {
  
        try {
          const body = req.body;
  
          const check = await onfido.check.create({
            applicantId: body.applicantId,
            reportNames:  ["document", "facial_similarity_photo"],
        });

          console.log("getapplicant Applicant success = ", applicant);
          
          res.json({success: true, data: check});
          
        } catch (err) {
          res.send({
              success: false,
              err: err.message,
              message: "Something went wrong, please try again later"
          });
        }
      });
  
  
  
    app.use('/applicant', router);
  
  }
  
  