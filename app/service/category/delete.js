const ObjectID = require('mongodb').ObjectID;

module.exports = function deleting(db, req, res) {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };

  db.collection('category').findOne(details, (error, oldCategory) => {
    if (error) res.send(JSON.stringify({status: 500, massage: error}));

    db.collection('category').update(details, {...oldCategory, paranoid: true}, (error, result) => {
      if (error) res.send(JSON.stringify({status: 500, massage: error}));

      res.send(result);
    });
  });
};
