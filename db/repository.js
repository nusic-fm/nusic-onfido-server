exports = module.exports = function(app, mongoose) {
  app.db = mongoose.createConnection(app.get('mongodb-url'),{ useNewUrlParser: true });
  autoIncrement = require('mongoose-auto-increment');
  autoIncrement.initialize(app.db);
  app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
  app.db.once('open', function () {
    console.log('mongoose open for business');
  });
}