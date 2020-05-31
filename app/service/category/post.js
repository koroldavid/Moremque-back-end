const rules    = require('../../rules/category');

module.exports = function post(db, req, res) {
    const validData = rules.create.validate(req.body);

    if (validData) {
      const { name } = req.body;
      const category = {
        name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        subCategoryIds: [],
        clicks: 0,
        isActive: false,
        paranoid: false
      };

      db.collection('category').insertOne(category, (error, result) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        res.send(result.ops[0]);
      });
    } else res.send(JSON.stringify({status: 'error', type : 'validation', fields: rules.create.getErrors()}));
}
