const rules = require('../../rules/product');
const ObjectID = require('mongodb').ObjectID;

module.exports = function post(db, req, res) {
    const validData = rules.create.validate(req.body);

    if (validData) {
      const { name, subCategoryId } = req.body;

      const product = {
        name,
        subCategoryId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        clicks: 0,
        isActive: false,
        paranoid: false
      };

      const subCategoryDetail = { '_id': new ObjectID(subCategoryId) };

      db.collection('product').insertOne(product, (error, result) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        db.collection('subCategory').findOne(subCategoryDetail, (error, subCategory) => {
          if (error) res.send(JSON.stringify({status: 500, massage: error}));

          const productIds = [...subCategory.productIds, result.ops[0]._id];

          db.collection('subCategory').update(subCategoryDetail, {...subCategory, productIds}, (error, subCategoryResult) => {
            if (error) res.send(JSON.stringify({status: 500, massage: error}));

            res.send(result.ops[0]);
          });
        });
      });
    } else res.send(JSON.stringify({status: 'error', type : 'validation', fields: rules.create.getErrors()}));
}
