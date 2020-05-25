const LIVR = require('livr');

LIVR.Validator.defaultAutoTrim(true);

const validateCreate = new LIVR.Validator({
    name : ['required']
});
// they are the same, but my vision of architecture says another :)
const validateUpdate = new LIVR.Validator({
    name : ['required']
});

module.exports = {
    create : validateCreate,
    update : validateUpdate
}