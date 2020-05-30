const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);

const validateCreate = new LIVR.Validator({
    name : ['required']
});

const validateUpdate = new LIVR.Validator({
    name : ['required']
});

module.exports = {
    create : validateCreate,
    update : validateUpdate
}