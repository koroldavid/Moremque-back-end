const list = require('./list');
const deleting = require('./delete');
const post = require('./post');
const put = require('./put');

module.exports = {
    list,
    post,
    put,
    delete: deleting
}
