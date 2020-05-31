const service  = require('../service/product');

module.exports = function(app, db) {
  app.get('/product', (req, res) => service.list(db, req, res));
  app.post('/product', (req, res) => service.post(db, req, res));
  app.put ('/product/:id', (req, res) => service.put(db, req, res));
  app.delete('/product/:id', (req, res) => service.delete(db, req, res));
};