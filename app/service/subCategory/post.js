const rules = require('../../rules/subCategory');
const ObjectID = require('mongodb').ObjectID;

module.exports = function list(db, req, res) {
    const validData = rules.create.validate(req.body);

    if (validData) {
      const { name, categoryId } = req.body;

      const subCategory = {
        name,
        categoryId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        productIds: [],
        clicks: 0,
        isActive: false,
      };

      const categoryDetail = { '_id': new ObjectID(categoryId) };

      db.collection('subCategory').insertOne(subCategory, (error, result) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        db.collection('category').findOne(categoryDetail, (error, category) => {
          if (error) res.send(JSON.stringify({status: 500, massage: error}));

          const subCategoryIds = [...category.subCategoryIds, result.ops[0]._id];

          db.collection('category').update(categoryDetail, {...category, subCategoryIds}, (error, categoryResult) => {
            if (error) res.send(JSON.stringify({status: 500, massage: error}));

            res.send(result.ops[0]);
          });
        });
      });
    } else res.send(JSON.stringify({status: 'error', type : 'validation', fields: rules.create.getErrors()}));
}