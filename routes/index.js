exports = module.exports = function (app, mongoose) {
  
  require('./helpers')(app, mongoose);

  require('./users')(app, mongoose);

  require('./onfido-create-applicant')(app, mongoose);
}