module.exports = function list(db, req, res) {
    db.collection('subCategory').find().toArray((error, subCategories) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        const { limit, offset, id} = req.query;
        const from = offset;
        const to = (+offset) + (+limit);

        const filtredResult = subCategories.filter(subCategory => subCategory.categoryId === id);
        const nonParanoid = filtredResult.filter(category => !category.paranoid);

        const responce = {
            data  : nonParanoid.slice(from, to),
            total : nonParanoid.length
          }

        res.send(responce);
    });
}
