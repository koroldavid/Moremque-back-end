const products = require('./products_routes');
const category = require('./category');

module.exports = function(app, db) {
    products(app, db);
    category(app, db);
};