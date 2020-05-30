const service  = require('../service/category');

module.exports = function(app, db) {
  app.get('/category', (req, res) => service.list(db, req, res));
  app.post('/category', (req, res) => service.post(db, req, res));
  app.put ('/category/:id', (req, res) => service.put(db, req, res));
  app.delete('/category/:id', (req, res) => service.delete(db, req, res));
};