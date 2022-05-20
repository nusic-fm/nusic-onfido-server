exports = module.exports = function (app, mongoose) {
    
    require('./jwt')(app, mongoose);
}