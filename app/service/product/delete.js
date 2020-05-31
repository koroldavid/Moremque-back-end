const ObjectID = require('mongodb').ObjectID;

module.exports = function deleting(db, req, res) {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };

  db.collection('product').findOne(details, (error, oldProduct) => {
    if (error) res.send(JSON.stringify({status: 500, massage: error}));

    db.collection('product').update(details, {...oldProduct, paranoid: true}, (error, result) => {
      if (error) res.send(JSON.stringify({status: 500, massage: error}));

      res.send(result);
    });
  });
};
