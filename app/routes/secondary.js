const service  = require('../service/secondary');

module.exports = function(app, db) {
  app.get('/categoryStuture', (req, res) => service.getCategoryStructure(db, req, res));
};