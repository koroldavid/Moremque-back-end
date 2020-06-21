const ObjectID = require('mongodb').ObjectID;
const rules    = require('../../rules/product');

module.exports = function put(db, req, res) {
    const validData = rules.update.validate(req.body);

    if (validData) {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };

      const { name, isActive, paranoid } = req.body;
      const updateBody = {
        name,
        isActive,
        paranoid
      };

      db.collection('product').findOne(details, (error, oldProduct) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        db.collection('product').update(details, {...oldProduct, ...updateBody}, (error, result) => {
          if (error) res.send(JSON.stringify({status: 500, massage: error}));

          res.send(result);
        });
      });
    } else res.send(JSON.stringify({status: 'error', type : 'validation', fields: rules.update.getErrors()}));
};
