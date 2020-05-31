const ObjectID = require('mongodb').ObjectID;

module.exports = function deleting(db, req, res) {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };

  db.collection('subCategory').findOne(details, (error, oldSubCategory) => {
    if (error) res.send(JSON.stringify({status: 500, massage: error}));

    db.collection('subCategory').update(details, {...oldSubCategory, paranoid: true}, (error, result) => {
      if (error) res.send(JSON.stringify({status: 500, massage: error}));

      res.send(result);
    });
  });
};
