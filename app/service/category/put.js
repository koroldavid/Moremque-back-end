const ObjectID = require('mongodb').ObjectID;
const rules    = require('../../rules/category');

module.exports = function list(db, req, res) {
    const validData = rules.update.validate(req.body);

    if (validData) {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };

      const updateBody = {
        name: req.body.name
      };

      db.collection('category').findOne(details, (error, oldCategory) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        db.collection('category').update(details, {...oldCategory, ...updateBody}, (error, result) => {
          if (error) res.send(JSON.stringify({status: 500, massage: error}));

          res.send(result);
        });
      });
    } else res.send(JSON.stringify({status: 'error', type : 'validation', fields: rules.update.getErrors()}));
};
