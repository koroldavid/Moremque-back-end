const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);

const validateCreate = new LIVR.Validator({
    name          : ['required'],
    subCategoryId : ['required']
});

const validateUpdate = new LIVR.Validator({
    name     : ['required'],
    isActive : ['required'],
    paranoid : ['required'],
});

module.exports = {
    create : validateCreate,
    update : validateUpdate
}