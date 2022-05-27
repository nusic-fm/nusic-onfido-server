exports = module.exports = function(app, mongoose) {

    var express = require('express');
    var router = express.Router();
    var path = require('path');
    var fs = require('fs');
    const axios = require('axios');
    const baseURL = "https://api.eu.onfido.com/v3.4";

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
            "first_name": body.firstName,
            "last_name": body.lastName,
            "location": {
              "ip_address": "127.0.0.1",
              "country_of_residence": "GBR"
            }
        });
        console.log("Applicant success = ", applicant);

        const checkCreated = await onfido.check.create({
          applicant_id: "512e7103-4726-4209-9548-8d6ee51fdabb",
          reportNames:  ["document"],
        });

        console.log("checkCreated success = ", checkCreated);

        if(checkCreated && checkCreated.id) {
          console.log("In If");
          const check = await onfido.check.find(checkCreated.id);
          console.log("check success = ", check);
          if(check.result == "clear") {
            console.log("In If check result = ",check.result);
            return res.json({success: true, data: "KYC Completed"});
          } 
        }

        return res.json({success: false, data: "Unable to process request"});
        
      } catch (err) {
        res.send({
            success: false,
            err: err.message,
            message: "Something went wrong, please try again later"
        });
      }
    });
  
    router.post('/create-applicant', async function(req, res, next) {
      try {
        const body = req.body;
        console.log("body = ", body);

        const applicant = await onfido.applicant.create({
            "first_name": "Jane1",
            "last_name": "Kane1",
            "location": {
              "ip_address": "127.0.0.1",
              "country_of_residence": "GBR"
            }
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

    router.post('/getapplicant', async function(req, res, next) {
  
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

      router.post('/upload', async function(req, res, next) {
  
        try {
          const body = req.body;
          console.log("body = ", body);
  
          const docUpload = await onfido.applicant.upload({
              "applicant_id": body.applicantId,
              "file": fs.createReadStream(path.join(__dirname, '../assets/sample_driving_licence.png')),
              "type": "driving_licence",
              "first_name": "Jane2",
              "last_name": "Kane2"
          });
          console.log("docUpload success = ", docUpload);
  
          res.json({success: true, data: docUpload});
          
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
            applicant_id: body.applicantId,
            reportNames:  ["document"],
        });

          console.log("getapplicant Applicant success = ", check);
          
          res.json({success: true, data: check});
          
        } catch (err) {
          res.send({
              success: false,
              err: err.message,
              message: "Something went wrong, please try again later"
          });
        }
      });


      router.post('/create-api', async function(req, res, next) {
        try {
          const body = req.body;
          console.log("body = ", body);

          const response = await axios.post(baseURL+"/applicants", 
            {
              "first_name": body.firstName,
              "last_name": body.lastName,
              "dob": "1990-01-01",
              "email": null,
              "address": {
                "street": "Second Street",
                  "town": "London",
                  "postcode": "S2 2DF",
                  "country": "GBR"
              },
              "location": {
                  "ip_address": "127.0.0.1",
                  "country_of_residence": "GBR"
              }
            },
            {
              headers:{
                "Authorization": "Token token=api_sandbox.J_lUx0wY7TW.8RdDbggIvDme4P5xMFVXZrB7axeTvMGi",
                "Content-Type":"application/json"
              } 
            }
          );
          console.log("Response data = ", response.data);
          if(response.data){

            return res.json({success: true, data: response.data});
          }
          else {
            return res.json({success: false, data: data});
          }
        } catch (err) {
          res.send({
              success: false,
              err: err.message,
              message: "Something went wrong, please try again later"
          });
        }
      });

      router.post('/upload-api', async function(req, res, next) {
        try {
          const body = req.body;
          console.log("body = ", body);
          //console.log("file stream = ",fs.createReadStream(path.join(__dirname, '../assets/sample_driving_licence.png')));
          const response = await axios.post("https://api.eu.onfido.com/v3.4/documents", 
            {
              applicant_id: body.applicant_id,
              type: "driving_licence",
              file: fs.createReadStream("D:\\developmentData\\Blockchain\\02_nusic\\nusic-onfido-server\\assets\\sample_driving_licence.png"),
              
              //file: fs.createReadStream(path.join(__dirname, '../assets/sample_driving_licence.png')),
            },
            {
              headers:{
                "Authorization": "Token token=api_sandbox.J_lUx0wY7TW.8RdDbggIvDme4P5xMFVXZrB7axeTvMGi",
                "Content-Type":"multipart/form-data"
              } 
            }
          );
          console.log("Response data = ", response.data);
          if(response.data){

            return res.json({success: true, data: response.data});
          }
          else {
            return res.json({success: false, data: data});
          }
        } catch (err) {
          console.log("Error = ",err);
          res.send({
              success: false,
              err: err.message,
              message: "Something went wrong, please try again later"
          });
        }
      });
  
  
  
    app.use('/applicant', router);
  
  }
  
  