const ObjectID = require('mongodb').ObjectID;

module.exports = function list(db, req, res) {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('category').remove(details, (error, item) => {
      if (error) res.send(JSON.stringify({status: 500, massage: error}));

      res.send(JSON.stringify({status: 200}));
    });
};