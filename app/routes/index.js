const category = require('./category');
const subCategory = require('./subCategory');
const secondary = require('./secondary');
const product = require('./product');

module.exports = function(app, db) {
    category(app, db);
    subCategory(app, db);
    secondary(app, db);
    product(app, db);
};