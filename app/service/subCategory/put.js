const ObjectID = require('mongodb').ObjectID;
const rules    = require('../../rules/subCategory');

module.exports = function list(db, req, res) {
    const validData = rules.update.validate(req.body);

    if (validData) {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };

      const updateBody = {
        name: req.body.name
      };

      db.collection('subCategory').findOne(details, (error, oldSubCategory) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        db.collection('subCategory').update(details, {...oldSubCategory, ...updateBody}, (error, result) => {
          if (error) res.send(JSON.stringify({status: 500, massage: error}));

          res.send(result);
        });
      });
    } else res.send(JSON.stringify({status: 'error', type : 'validation', fields: rules.update.getErrors()}));
};
