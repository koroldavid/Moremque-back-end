const ObjectID = require('mongodb').ObjectID;
const rules    = require('../rules/category.js');

module.exports = function(app, db) {
  app.get('/category', (req, res) => {
      db.collection('category').find().toArray((error, category) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        res.send(category);
      });
    });

  app.get('/category/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };

      db.collection('recipes').findOne(details, (error, recipe) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        const fittedIds = recipe.versionsId.map(id => {
          return new ObjectID(id);
        });

        const historyDetails = { '_id': { '$in' : [new ObjectID(id) ,...fittedIds]} };

        db.collection('recipes').find(historyDetails).toArray((error, recipeHistory) => {
          if (error) res.send(JSON.stringify({status: 500, massage: error}));

          const sortedHistory = recipeHistory.sort((a, b) => {
            if (a.dateCreated < b.dateCreated) return 1;
            if (a.dateCreated > b.dateCreated) return -1;
  
            return 0
          });

          res.send(sortedHistory);
        });
      });
    });

  app.post('/category', (req, res) => {
    const validData = rules.create.validate(req.body);

    if (validData) {
      const { name } = req.body;
      const category = {
        name
      };

      db.collection('category').insertOne(category, (error, result) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        res.send(result.ops[0]);
      });
    } else res.send(JSON.stringify({status: 'error', type : 'validation', fields: rules.create.getErrors()}));
  });

  app.put ('/category/:id', (req, res) => {
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
  });

  app.delete('/category/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('category').remove(details, (error, item) => {
      if (error) res.send(JSON.stringify({status: 500, massage: error}));

      res.send(JSON.stringify({status: 200}));
    });
  });
};