const service  = require('../service/subCategory');

module.exports = function(app, db) {
  app.get('/subCategory', (req, res) => service.list(db, req, res));
  app.post('/subCategory', (req, res) => service.post(db, req, res));
  app.put ('/subCategory/:id', (req, res) => service.put(db, req, res));
  app.delete('/subCategory/:id', (req, res) => service.delete(db, req, res));
};